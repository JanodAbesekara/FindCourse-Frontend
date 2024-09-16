import React, { useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode"; // Correctly import jwt-decode

function Profile() {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    family_name: '',
  });

  useEffect(() => {
    // Retrieve the stored token from localStorage
    const storedToken = localStorage.getItem("ID_TOKEN");

    if (storedToken) {
      try {
        // Decode the JWT token
        const decoded = jwtDecode(storedToken);

        // Update the state with user details from the decoded token
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
    </div>
  );
}

export default Profile;
