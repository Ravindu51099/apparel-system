// import logo from "./logo.svg";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./Componants/Admin/Sidebar/Sidebar";
import "./App.css";
import Login from "./Componants/Login/Login";
import Dashboard from "./Componants/Admin/Dashboard";
import FrontOfficeForm from "./Componants/FrontOfficeManager/FrontOffice";

function App() {
  return (
    <div>
      {/* <Login/> */}
      {/* <Dashboard/> */}
      {/* <Sidebar /> */}
      <FrontOfficeForm />
    </div>
  );
}

export default App;
