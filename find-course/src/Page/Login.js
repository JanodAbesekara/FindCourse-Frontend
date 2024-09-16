import React from "react";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  // Function to filter the idToken from the user object
  const filterIdToken = (userObject) => {
    const oidcUser = userObject.authorities.find(
      (authority) => authority.authority === "OIDC_USER"
    );

    if (oidcUser && oidcUser.idToken) {
      return oidcUser.idToken.tokenValue;
    } else {
      return null;
    }
  };

  // Function to handle Google login
  const handleGoogleLogin = () => {
    // Redirect user to Google login (back-end will handle this part)
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  // Fetch user details after successful authentication
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/gouth", {
        withCredentials: true,
      });

      // Filter the idToken using the filterIdToken function
      const idToken = filterIdToken(response.data);

      // Store the idToken in localStorage if it exists
      if (idToken) {
        localStorage.setItem("ID_TOKEN", idToken); // Store the idToken
        console.log("Filtered idToken:", idToken);

        // Navigate to profile if authentication is successful
        navigate("/profile");
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
