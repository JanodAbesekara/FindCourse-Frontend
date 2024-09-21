import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Corrected import for jwt-decode
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    family_name: "",
  });

  const [feedback, setFeedback] = useState("");

  // Function to handle logout
  const logout = () => {
    const token = localStorage.getItem("ID_TOKEN");

    if (!token) {
      window.alert("Token not found");
      navigate("/login");
    } else {
      localStorage.removeItem("ID_TOKEN");
      window.alert("Logout successful");

      // Refresh the page and navigate to login
      navigate("/login", { replace: true }); // Ensures proper navigation
      window.location.reload(); // Refresh the page to clear any state
    }
  };

  // useEffect to handle fetching user data on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("ID_TOKEN");

    if (!storedToken) {
      window.alert("No token found. Please login.");
      navigate("/login");
      return; // Exit if no token is found
    }

    // Decoding the token to get user information
    try {
      const decoded = jwtDecode(storedToken);
      setUserData({
        email: decoded.email,
        name: decoded.name,
        family_name: decoded.family_name,
      });
    } catch (err) {
      console.error("Error decoding token:", err);
      window.alert("Invalid token. Please login again.");
      navigate("/login");
    }

    // Fetch user role and navigate accordingly
    fetchData();
  }, [navigate]);

  // Function to fetch user role and navigate based on the role
  const fetchData = async () => {
    const storedToken = localStorage.getItem("ID_TOKEN");

    if (!storedToken) return;

    const decoded = jwtDecode(storedToken);
    const email = decoded.email;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/V1/getuserdetails?email=${email}`
      );

      const user = response.data;
      const userRole = user.role;

      console.log("User Role:", userRole);

      if (userRole === "Admin") {
        navigate("/ProfileForUser");
      } else if (userRole === "Student") {
        navigate("/Profile");
      } else {
        window.alert("Unknown role, unable to navigate.");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      window.alert("Error fetching user details.");
    }
  };

  // Function to handle feedback submission
  const handlesubmit = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("ID_TOKEN");
    if (!storedToken) {
      window.alert("No token found. Please login.");
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(storedToken);
    const email = decoded.email;

    const data = {
      feedback: feedback,
      useremail: email,
    };

    try {
      await axios.post(`http://localhost:8080/api/V1/addFeedback`, data);
      console.log("Feedback data:", data);
      window.alert("Feedback added successfully!");
      setFeedback(""); // Clear feedback input after submission
    } catch (err) {
      console.error("Error adding feedback:", err);
      window.alert("Error adding feedback.");
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>
        <strong>Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Family Name:</strong> {userData.family_name}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>

      <button onClick={logout}>Logout</button>

      <form onSubmit={handlesubmit}>
        <label>Add Feedback</label>
        <input
          type="text"
          name="feedback"
          value={feedback} // Set value to clear input after submit
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Profile;
