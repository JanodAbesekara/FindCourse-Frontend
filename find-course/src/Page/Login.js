import React from "react";
import Navbar from "../Component/Navbar";


function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
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
