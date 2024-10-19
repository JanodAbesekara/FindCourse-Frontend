import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home.js";
import Projile from "./Page/Projile.js";
import ProfileForUser from "./Page/ProfileForUser.js";
import Adminpages from "./Page/Adminpages.js";


function App() {
  return (
    <div className="App">
 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Projile" element={<Projile/>} />
        <Route path="/ProfileForUser" element={<ProfileForUser/>} />
        <Route path="/Adminpages" element={<Adminpages/>} />
      </Routes>
    </div>
  );
}

export default App;
