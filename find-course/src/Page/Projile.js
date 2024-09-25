import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [Dataemail, setEmail] = useState("");
  const [getdata, setgetdata] = useState(null); // Changed initial state to null



  // Fetch user data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/User-info", { withCredentials: true })
      .then((response) => {
        const user = response.data;
        setUserData(user);
        setEmail(user.email);

        // Serialize the user object into JSON format and store it in localStorage
        localStorage.setItem("ALLOBJECT_GET", JSON.stringify(user));

        // Call fetchData once email is set
        fetchData(user.email);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Function to fetch additional profile data based on email
  const fetchData = (email) => {
    axios
      .get(`http://localhost:8080/api/V1/getuserdetails?email=${email}`, { withCredentials: true })
      .then((response) => {
        const Profile = response.data;
        setgetdata(Profile);
        console.log(Profile);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
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
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {/* Render buttons conditionally based on role */}
      {getdata ? (
        getdata.role === "Student" ? (
          <button>
            <Link to="/ProfileForUser">Student Profile</Link>
          </button>
        ) : getdata.role === "Admin" ? (
          <button>
            <Link to="/Adminpages">Admin Profile</Link>
          </button>
        ) : null
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
}

export default Profile;
