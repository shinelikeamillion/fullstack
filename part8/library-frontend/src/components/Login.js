import React from "react";
import LoginForm from "./LoginForm";

const Login = ({ show, setError, setToken }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm setError={setError} setToken={setToken} />
    </div>
  );
};

export default Login;
