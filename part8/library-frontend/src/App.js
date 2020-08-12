import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const storedToken = localStorage.getItem("user-token");
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(storedToken);
  const [error, setError] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button
              onClick={() => {
                logout();
              }}
            >
              {" "}
              logout{" "}
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setPage("login");
              setPage("authors");
            }}
          >
            login
          </button>
        )}
      </div>

      {error && <p>{error}</p>}

      <Authors show={page === "authors"} setError={setError} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={setError} />

      {!token && (
        <Login
          show={page === "login"}
          setError={setError}
          setToken={setToken}
        />
      )}
    </div>
  );
};

export default App;
