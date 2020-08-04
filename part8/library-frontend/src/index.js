import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

/** mission:
 * 1. show all author
 * 2. all book's detail except categrary
 * 3. add new book add async data
 * 4. update autor birth year
 * 5. only can change year
 */

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
