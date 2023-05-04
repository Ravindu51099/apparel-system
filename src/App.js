// // import logo from "./logo.svg";
// // import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Sidebar from "./Componants/Admin/Sidebar/Sidebar";
// import "./App.css";
// import Login from "./Componants/Login/Login";
// import FrontOfficeForm from "./Componants/FrontOfficeManager/FrontOffice";
// import ProductionPage from "./Componants/ProductionEmployee/ProductionEmployee";

// function App() {
//   return (
//     <div>
//       <Login/>
//       {/* <Sidebar /> */}
//       {/* <FrontOfficeForm /> */}
//       {/* <ProductionPage /> */}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Login from "./Componants/Login/Login";
import Sidebar from "./Componants/Admin/Sidebar/Sidebar";
// import Customers from ;
import FrontOfficeForm from "./Componants/FrontOfficeManager/FrontOffice";
import ProductionPage from "./Componants/ProductionEmployee/ProductionEmployee";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Col, Row } from "antd";
import Customers from "./Componants/Customers/Customer";
import Dashboard from "./Componants/Admin/Dashboard";
// import Orders from "../../Orders/Orders";
// import Tasks from "../../Tasks/Tasks";
import Orders from "./Componants/Orders/Orders";
import Tasks from "./Componants/Tasks/Tasks";

function App() {
  const role = localStorage.getItem("role");
  const loggedInUser = localStorage.getItem("authenticated");
  const [authenticated, setauthenticated] = useState(
    loggedInUser ? loggedInUser : false
  );

  return (
    <div>
      <BrowserRouter>
        <Row>
          <Col span={4}>{role === "admin" ? <Sidebar /> : ""}</Col>
          <Col span={20}>
            <Routes>
              {role === "admin" ? (
                <Route path="/" element={<Dashboard />} />
              ) : (
                ""
              )}
              {role === "admin" ? (
                <Route path="/customers" element={<Customers />} />
              ) : (
                ""
              )}
              {role === "admin" ? (
                <Route path="/orders" element={<Orders />} />
              ) : (
                ""
              )}
              {role === "admin" ? (
                <Route path="/tasks" element={<Tasks />} />
              ) : (
                ""
              )}
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </Col>

          
        </Row>
        <Col>{role === "production" ? <ProductionPage /> : ""}</Col>
          
        <Col>{role === "FrontOffice" ? <FrontOfficeForm /> : ""}</Col>
      </BrowserRouter>
    </div>
  );
}

export default App;
