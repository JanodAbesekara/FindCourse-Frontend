import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Page/Login.js";
import Home from "./Page/Home.js";


function App() {
  return (
    <div className="App">
 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
