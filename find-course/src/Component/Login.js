import React from "react";
import { FcGoogle } from "react-icons/fc";

function Login({ closeLoginModal }) {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl mb-4">Login</h1>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        <FcGoogle className="mr-2" />
        Login with Google
      </button>

      <button
        onClick={closeLoginModal}
        className="mt-4 w-full text-center text-red-500"
      >
        Cancel
      </button>
    </div>
  );
}

export default Login;
