import React, { useState, useEffect } from "react";
import axios from "axios";

function Adminpages() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    try {
      const response = axios.get(
        `http://localhost:8080/api/V1/getallfeedbacks`,
        {
          withCredentials: true,
        }
      );
      //setFeedback(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  }, []);

  return (
    <div>
      <h1>Admin page</h1>

      <h3>Feed backs</h3>
    </div>
  );
}

export default Adminpages;
