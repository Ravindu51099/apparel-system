// import logo from "./logo.svg";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./Componants/Admin/Sidebar/Sidebar";
import "./App.css";
import Login from "./Componants/Login/Login";
import Dashboard from "./Componants/Admin/Dashboard";
import FrontOfficeForm from "./Componants/FrontOfficeManager/FrontOffice";
import ProductionPage from "./Componants/ProductionEmployee/ProductionEmployee";

function App() {
  return (
    <div>
      {/* <Login/> */}
      {/* <Dashboard/> */}
      {/* <Sidebar /> */}
      {/* <FrontOfficeForm /> */}
      <ProductionPage />
    </div>
  );
}

export default App;
// import React, { useState } from 'react';
// import Login from './Componants/Login/Login';
// import Sidebar from "./Componants/Admin/Sidebar/Sidebar";
// import FrontOfficeForm from "./Componants/FrontOfficeManager/FrontOffice";
// import ProductionPage from "./Componants/ProductionEmployee/ProductionEmployee";

// function App() {
//   const [userType, setUserType] = useState('');

//   const handleLogin = (userType) => {
//     setUserType(userType);
//   };

//   return (
//     <div>
//       {userType === '' ? (
//         <Login handleLogin={handleLogin} />
//       ) : userType === 'admin' ? (
//         <Sidebar />
//       ) : userType === 'front_office' ? (
//         <FrontOfficeForm />
//       ) : (
//         <ProductionPage />
//       )}
//     </div>
//   );
// }

// export default App;
