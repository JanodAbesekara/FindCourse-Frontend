import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import { LuSendHorizonal } from "react-icons/lu";
import Login from '../Component/Login';

function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");
  const [queryEntered, setQueryEntered] = useState(false); //check the query has entered or not
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQueryEntered(true);

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

  const openLoginModal = () => {
    setIsLoginModalOpen(true); // Open the login modal
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false); // Close the login modal
  };

  return (
    <div>
  <Navbar openLoginModal={openLoginModal} />
  <div className="flex flex-col min-h-screen justify-center items-center mb-6">
    {queryEntered ? (
      <div className=" flex flex-col space-y-4 mb-8 ">
        <div className="flex justify-end">
          <div className="bg-blue-50 text-black p-2 rounded-lg width-full max-w-[90%]">{query}</div>
        </div>
        <div className="flex justify-start">
          <div className="bg-gray-50 text-black p-2 rounded-lg width-full max-w-[90%]">{data}</div>
        </div>
      </div>
    ) : (
      <h2 className="mb-4 text-lg font-semibold">Hello, Tell me what do you want to know ?</h2>
    )}

    <form onSubmit={handleSubmit} className="flex w-full justify-center">
      <div className="relative w-full max-w-lg flex items-center"> {/* Make input relative for absolute positioning */}
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
