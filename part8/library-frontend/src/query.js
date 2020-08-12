import { gql } from "@apollo/client";

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        ...AuthorDetails
      }
      published
      genres
    }
  }
  ${AUTHOR_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
      title
      author {
        ...AuthorDetails
      }
      published
      genres
    }
  }
  ${AUTHOR_DETAILS}
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      id
      name
      born
    }
  }
`;

export const ALL_AUTHORS = gql`
  query GetAllAuthors {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      id
      title
      author {
        ...AuthorDetails
      }
      published
      genres
    }
  }
  ${AUTHOR_DETAILS}
`;
