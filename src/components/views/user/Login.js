import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';

const Login = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    login(email, password);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" />
        <br />
        <label>Password:</label>
        <input type="password" name="password" />
        <br />
        <button type="submit">Login</button>
      </form>
      {/* {!isAuthenticated && (
        <button onClick={logout}>Logout</button>
      )} */}
       <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Login;