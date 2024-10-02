import React, { useState, useEffect } from "react";
import axios from "axios";

function Adminpages() {
  const [feedback, setFeedback] = useState([]);
  const [useremail, setuseremail] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/V1/getallfeedbacks`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setFeedback(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    console.log("Feedback ID:", id);

    axios
      .delete(`http://localhost:8080/api/V1/deletefeedback?id=${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Feedback deleted:", response.data);
        setFeedback(feedback.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting feedback:", error);
      });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const email = useremail;

    console.log(email);

    axios
      .post(`http://localhost:8080/api/V1/UpdateAdmin?email=${email}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        window.alert("Admin created successfully!");
        setuseremail("");
      })
      .catch((error) => {
        console.error("Error creating admin:", error);
      });
  };

  return (
    <div>
      <h1>Admin page</h1>
      <p>Create Admin</p>
      <form onSubmit={handlesubmit}>
        <label>User Email:</label>
        <input type="email" onChange={(e) => setuseremail(e.target.value)} />
        <button type="submit">Create Admin</button>
      </form>

      <h3>Feed backs</h3>
      <ul>
        {feedback.map((feedback) => (
          <li key={feedback.id}>
            <p>
              <strong>id:</strong> {feedback.id}
            </p>
            <p>
              <strong>Email:</strong> {feedback.useremail}
            </p>
            <p>
              <strong>Feedback:</strong> {feedback.feedback}
            </p>
            <button onClick={() => handleDelete(feedback.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Adminpages;
