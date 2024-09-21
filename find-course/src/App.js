import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Page/Login.js";
import Home from "./Page/Home.js";
import Projile from "./Page/Projile.js";
import ProfileForUser from "./Page/ProfileForUser.js";


function App() {
  return (
    <div className="App">
 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Projile" element={<Projile/>} />
        <Route path="/ProfileForUser" element={<ProfileForUser/>} />
      </Routes>
    </div>
  );
}

export default App;
