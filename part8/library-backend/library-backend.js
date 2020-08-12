const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./models/books");
const Author = require("./models/author");
const User = require("./models/user");
const config = require("./utils/config");
const jwt = require("jsonwebtoken");

const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

/**
 * 所有查询和修改
 * 处理数据库验证错误
 * 添加用户管理（favoriteGenre, token, query, create, login）
 */

const MONGODB_URI = config.DB_URI;
console.log("connecting to ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB", error.message);
  });

mongoose.set("useCreateIndex", true);

// load data
// (async function () {
//   await Promise.all(
//     books
//       .map((book) => new Book(book).save())
//       .concat(authors.map((author) => new Author(author).save()))
//   );
// })();

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }

  type Author {
    id: String!
    name: String!
    born: Int
    books: [Book]
    bookCount: Int!
  }

  type Book {
    id: String!
    title: String!
    author: Author!
    genres: [String]!
    published: Int!
  }

  type User {
    username: String!
    id: String!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(title: String!): Book
    findAuthor(name: String!): Author
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      if (args.author && args.genre) {
        return books.filter(
          (b) =>
            b.author.includes(args.author) && b.genres.includes(args.genres)
        );
      } else if (args.author) {
        return books.filter((book) => book.author.name === args.author);
      } else if (args.genre) {
        return books.filter((b) => b.genres.includes(args.genre));
      }
      return books;
    },
    allAuthors: () => Author.find({}).populate("books"),
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
    findBook: (root, args) => Book.findOne({ title: args.title }),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: (root) => root.books.length,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not aurhenticated");
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (e) {
          throw new UserInputError(e.message);
        }
      }
      const book = new Book({ ...args, id: uuid(), author: author._id });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      const savedBook = book.populate("author").execPopulate();

      pubsub.publish("BOOK_ADDED", { bookAdded: savedBook });

      return savedBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not aurhenticated");
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password != "secred") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user.id,
      };

      return { value: jwt.sign(userForToken, config.SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
