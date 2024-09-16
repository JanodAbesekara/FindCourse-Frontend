import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";

function Login() {
   
    const Handlesubmit = async () => {

        try{
            const respond = await axios.get("http://localhost:8080/gouth");
            window.alert(respond.data);
      
        }catch(err){
            console.log(err);
        }
     
    };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}> Login</h1>

      <form style={{ textAlign: "center" }}>
        <button onClick={Handlesubmit}>Google</button>
      </form>
    </div>
  );
}

export default Login;
