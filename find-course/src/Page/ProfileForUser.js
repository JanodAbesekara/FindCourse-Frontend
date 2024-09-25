import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileForUser() {
  const [userData, setUserData] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();

    const data = localStorage.getItem("ALLOBJECT_GET");
    if (data) {
      const email = userData.email;

      const data = {
        feedback: feedback,
        useremail: email,
      };

      const response = axios.post(
        `http://localhost:8080/api/V1/addFeedback`,
        data,
        { withCredentials: true }  
      )
      console.log("Feedback data:", data);
      window.alert("Feedback added successfully!");
      setFeedback("");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("ALLOBJECT_GET");
    if (data) {
      setUserData(JSON.parse(data)); // Parse and set the stored user data
    }
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          {userData.picture && (
            <img
              src={userData.picture}
              alt="User Profile"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      ) : (
        <p>No user data found in local storage.</p>
      )}

      <div>
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
    </div>
  );
}

export default ProfileForUser;
