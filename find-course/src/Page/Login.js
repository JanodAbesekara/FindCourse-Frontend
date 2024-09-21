import React from "react";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  // Function to handle Google login
  const handleGoogleLogin = () => {
    // Redirect user to Google login (back-end will handle this part)
    window.location.href = "http://localhost:8080/oauth2/authorization/google";

    // Check if the user is already logged in
    const idToken = localStorage.getItem("ID_TOKEN");
    if (idToken) {
      navigate("/Profile");
    } else {
      // If not logged in, fetch the user details
      fetchUserDetails();
    }
  };

  // Function to handle the user login and fetch the idToken
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/gouth", {
        withCredentials: true,
      });

      console.log(response.data.authorities[0].idToken.tokenValue);
      // Assuming the response contains the idToken directly (adjust the key as per response)
      const idToken = response.data.authorities[0].idToken.tokenValue; // Adjust the response structure if needed

      // Store the idToken in localStorage if it exists
      if (idToken) {
        localStorage.setItem("ID_TOKEN", idToken); // Store the idToken
        console.log("Stored idToken:", idToken);

        // Navigate to profile if authentication is successful
        navigate("/Profile");
      } else {
        window.alert("Login failed: No idToken found in response.");
      }
    } catch (err) {
      console.error("Login failed", err);
      window.alert("Login failed!");
    }
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Login</h1>

      <form style={{ textAlign: "center" }}>
        <button type="button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
