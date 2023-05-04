import React, { useState } from "react";
import "./Login.css";
import jacketVideo from "../Images/Sliding.mp4";
import ProductionPage from "../ProductionEmployee/ProductionEmployee";
import FrontOfficeForm from "../FrontOfficeManager/FrontOffice";
import Sidebar from "../Admin/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showProductionPage, setShowProductionPage] = useState(false);
  const [showFrountOffice, setShowFrountOffice] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  // const [authenticated, setauthenticated] = useState(
  //   localStorage.setItem(localStorage.getItem("authenticated") || false)
  // );
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // const IsLoggedIn = data.user.email != null ? true : false
      // console.log(IsLoggedIn)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      // localStorage.setItem("authenticated", true);
      //   setauthenticated(true);
      navigate("/"); // set location
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    console.log("login");
  };
 

  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={jacketVideo} type="video/mp4" />
      </video>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Username :</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
