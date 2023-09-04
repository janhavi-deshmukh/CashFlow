import React from "react";
import Home from "./pages/homepg/Home.js";
import Login from "./pages/login/Login.js";
import Register from "./pages/register/Register.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </>
    
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children
  }else{
    return <Navigate to="/login"/>;
  }
}
export default App;
