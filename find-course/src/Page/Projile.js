import React, { useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode"; // Correctly import jwt-decode
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    family_name: '',
  });


  const logout = () => {
    const token = localStorage.getItem("ID_TOKEN");

    if(!token){
      window.alert("Token Not found");
      navigate("/login");
    }else{
      localStorage.removeItem("ID_TOKEN");
      window.alert("Logout Successful");
      navigate("/login");
  }
  };

  useEffect(() => {
   
    const storedToken = localStorage.getItem("ID_TOKEN");

    if (!storedToken) {
      window.alert("No token found. Please login.");
      navigate("/login");
    }

    if (storedToken) {
      try {
      
        const decoded = jwtDecode(storedToken);

      
        setUserData({
          email: decoded.email,
          name: decoded.name,
          family_name: decoded.family_name,
        });
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Family Name:</strong> {userData.family_name}</p>
      <p><strong>Email:</strong> {userData.email}</p>


      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
