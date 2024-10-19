import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.png'

function Navbar({ openLoginModal }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white h-16"> {/* Fixed height for navbar */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="h-20 w-auto" /> {/* Increase width while keeping height constant */}
      </Link>
      <button 
        onClick={openLoginModal}
        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
      >
          Login
      </button>
    </div>
  )
}

export default Navbar