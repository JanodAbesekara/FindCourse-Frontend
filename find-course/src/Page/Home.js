import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";

function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8000/query`, {
        query: query,
      });

      setData(response.data.answer);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData("An error occurred while fetching data.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Home</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query"
        />
        <button type="submit">Submit</button>
      </form>

      <textarea
        readOnly
        value={data} // Display the returned data
        rows="10"
        cols="50"
      />
    </div>
  );
}

export default Home;
