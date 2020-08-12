import React, { useState } from "react";
import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../query";

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const [genre, setgenre] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataInStore.allBooks.concat(addedBook),
        },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
    },
  });

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks ?? [];

  const group = books.map((book) => book.genres);
  let genres = group.flat();
  genres = genres.filter((genre, index) => genres.indexOf(genre) === index);

  const filteredBooks = books.filter((book) =>
    genre ? book.genres.includes(genre) : book
  );

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre
        <select
          value={genre}
          onChange={({ target }) => {
            setgenre(target.value);
          }}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
