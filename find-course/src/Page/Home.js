import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import { LuSendHorizonal } from "react-icons/lu";
import Login from "../Component/Login";

function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [query, setQuery] = useState("");
  const [queryEntered, setQueryEntered] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn && clickCount >= 3) {
      setIsLoginModalOpen(true);
      return;
    }

    setQueryEntered(true);

    if (query.trim() !== "") {
      const newChatEntry = { query: query, response: "Loading..." };
      setChatHistory([...chatHistory, newChatEntry]);
    }

    if (!isLoggedIn && clickCount < 3) {
      setClickCount(clickCount + 1);
    }

    try {
      const response = await axios.post("http://localhost:8000/query", {
        query: query,
      });

      const fetchedData = response.data.answer;

      setChatHistory((prevHistory) =>
        prevHistory.map((entry, index) =>
          index === prevHistory.length - 1
            ? { ...entry, response: fetchedData }
            : entry
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setChatHistory((prevHistory) =>
        prevHistory.map((entry, index) =>
          index === prevHistory.length - 1
            ? { ...entry, response: "An error occurred while fetching data." }
            : entry
        )
      );
    }

    setQuery("");
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar openLoginModal={openLoginModal} className="fixed" />
      <div className="bg-gray-20 pb-8 mt-10 mx-10 sm:mx-20 md:mx-50 lg:mx-60 xl:mx-70 flex align-center justify-center">
        {queryEntered ? (
          <div className="flex-1 overflow-y-auto p-4 max-h-[60vh] mb-4 mt-8 mx-5">
            {chatHistory.map((chatEntry, index) => (
              <div key={index} className="flex flex-col space-y-2 mb-4">
                <div className="flex justify-end">
                  <div className="bg-blue-50 text-black p-3 rounded-lg max-w-[90%]">
                    {chatEntry.query}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-50 text-black p-3 rounded-lg max-w-[90%] whitespace-pre-line">
                    <div className="mt-2">
                      {chatEntry.response.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-center pt-60 text-2xl font-semibold">
            Hello, Search for courses!
          </h2>
        )}
      </div>
      <div className="w-full fixed bottom-0 p-4 bg-white shadow-lg">
        <form onSubmit={handleSubmit} className="flex justify-center">
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
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <Login closeLoginModal={closeLoginModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
