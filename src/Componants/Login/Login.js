import React, { useState } from "react";
import "./Login.css";
import jacketVideo3 from "../Images/Sliding.mp4";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("admin");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`Username: ${username}, Password: ${password}, Role: ${role}`);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data); // do something with the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="video-background">
      <video autoPlay loop muted>
        {/* <source src={jacketVideo} type="video/mp4" /> */}
        <source src={jacketVideo3} type="video/mp4" />
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
