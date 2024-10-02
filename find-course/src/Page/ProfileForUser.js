import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileForUser() {
  const [userData, setUserData] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackdata, setFeedbackdata] = useState([]);
  const [editingFeedbackId, setEditingFeedbackId] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();

    const dataD = localStorage.getItem("ALLOBJECT_GET");
    const Email = JSON.parse(dataD).email;

    const data = {
      feedback: feedback,
      useremail: Email,
    };

    if (editingFeedbackId) {
      const Data = {
        id: editingFeedbackId,
        feedback: feedback,
        useremail: Email,
      };
console.log(Data);
      axios
        .put(`http://localhost:8080/api/V1/updatefeedback`, Data, {
          withCredentials: true,
        })
        .then(() => {
          console.log(data);
          window.alert("Feedback updated successfully!");
          setFeedback("");
          setEditingFeedbackId(null); // Clear the editing state
          fetchFeedbacks(Email); // Refetch feedbacks after successful update
        })
        .catch((error) => {
          console.error("Error updating feedback:", error);
        });
    } else {
      const response = axios.post(
        `http://localhost:8080/api/V1/addFeedback`,
        data,
        { withCredentials: true }
      );

      window.alert("Feedback added successfully!");
      setFeedback("");
      window.location.reload();
    }
  };
  const handledelete = (id) => {
    console.log("Feedback ID:", id);

    axios
      .delete(`http://localhost:8080/api/V1/deleteallfeedbacks?id=${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting feedback:", error);
      });
  };

  const fetchFeedbacks = (Email) => {
    axios
      .get(
        `http://localhost:8080/api/V1/getonlyusersfeedbacks?email=${Email}`,
        { withCredentials: true }
      )
      .then((response) => {
        setFeedbackdata(response.data);
      })
      .catch((error) => console.error("Error fetching feedback data:", error));
  };

  useEffect(() => {
    const data = localStorage.getItem("ALLOBJECT_GET");
    const Email = JSON.parse(data)?.email;

    if (Email) {
      fetchFeedbacks(Email);
    }
  }, []);

  const handleEdit = (feedbackId, feedbackText) => {
    setEditingFeedbackId(feedbackId);
    setFeedback(feedbackText);
  };

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
      <div>
        <h4>Added Feddbacks</h4>
        <ul>
          {feedbackdata.map((feedbacks) => (
            <li key={feedbacks.id}>
              <p>
                <strong>Email:</strong> {feedbacks.useremail}
              </p>
              <p>
                <strong>Feedback:</strong> {feedbacks.feedback}
              </p>

              <p>
                <strong>id:</strong> {feedbacks.id}
              </p>

              <button onClick={() => handledelete(feedbacks.id)}>Delete</button>
              <button
                onClick={() => handleEdit(feedbacks.id, feedbacks.feedback)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileForUser;
