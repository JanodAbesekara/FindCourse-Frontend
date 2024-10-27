import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import { LuSendHorizonal } from "react-icons/lu";
import Login from '../Component/Login';

function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [query, setQuery] = useState("");
  const [queryEntered, setQueryEntered] = useState(false); // Check if a query has been entered
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control modal visibility
  const [chatHistory, setChatHistory] = useState([]); // Combined query and response pairs
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track login status

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the user is not logged in and click count is 3 or more, prevent further queries and show login modal
    if (!isLoggedIn && clickCount >= 3) {
      setIsLoginModalOpen(true);
      return;
    }

    setQueryEntered(true);

    if (query.trim() !== "") {
      // Add the new query to the chat history
      const newChatEntry = { query: query, response: "Loading..." };
      setChatHistory([...chatHistory, newChatEntry]);
    }

    // If user hasn't logged in, handle click count for login modal
    if (!isLoggedIn && clickCount < 3) {
      setClickCount(clickCount + 1);
    }

    try {
      const response = await axios.post(`http://localhost:8000/query, {
        query: query,
      }`);

      const fetchedData = response.data.answer;

      // Update the last chat entry with the actual response
      setChatHistory(prevHistory =>
        prevHistory.map((entry, index) =>
          index === prevHistory.length - 1
            ? { ...entry, response: fetchedData }
            : entry
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      // Update the last chat entry with an error message
      setChatHistory(prevHistory =>
        prevHistory.map((entry, index) =>
          index === prevHistory.length - 1
            ? { ...entry, response: "An error occurred while fetching data." }
            : entry
        )
      );
    }

    // Clear the query input
    setQuery("");
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true); // Open the login modal
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false); // Close the login modal
  };  
  

  return (
    <div className="flex flex-col h-screen"> {/* Make the main container fill the screen */}
      <Navbar openLoginModal={openLoginModal} className="fixed"/>
      
      <div className="bg-gray-20 pb-8 mt-10 mx-10 sm:mx-20 md:mx-50 lg:mx-60 xl:mx-70 flex align-center justify-center">
        {queryEntered ? (
          <div className="flex-1 overflow-y-auto p-4 max-h-[60vh] mb-4 mt-8 mx-5">
            {chatHistory.map((chatEntry, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="flex justify-end">
                  <div className="bg-blue-50 text-black p-2 rounded-lg width-full max-w-[90%]">
                    {chatEntry.query}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-50 text-black p-2 rounded-lg width-full max-w-[90%]">
                    {chatEntry.response}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
            <h2 className="text-center pt-60 text-2xl font-semibold">Hello, Search for courses !</h2>
        )}
      </div>

      {/* Input container fixed at the bottom */}
      <div className="w-full fixed bottom-0 p-4 bg-white shadow-lg">
        <form onSubmit={handleSubmit} className="flex justify-center"> {/* Center the input container */}
          <div className="relative w-full max-w-lg flex items-center">
            <input
              className="bg-gray-100 text-black p-3 rounded-3xl pl-4 pr-14 w-full sm:w-full md:w-[500px] lg:w-[600px] xl:w-[700px] focus:outline-none"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for courses"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl"
            >
              <LuSendHorizonal />
            </button>
          </div>
        </form>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <Login closeLoginModal={closeLoginModal} /> {/* Login component inside the modal */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;