import React, { useState } from "react";
import "./Login.css";
import jacketVideo from '../Images/jacket.mp4';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}, Role: ${role}`);
  };

  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={jacketVideo} type="video/mp4" />
      </video>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ float: "right", width: "100%" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
