import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}, Role: ${role}`);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="front office">Front Office</option>
          <option value="production employee">Production Employee</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
