import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const Navbar = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const info = JSON.parse(localStorage.getItem("info"));

    const handleLogout = () => {
        const userInfo = localStorage.getItem("info");
        
        if (userInfo) {
            localStorage.removeItem("info");
            console.log("User successfully logged out.");
            window.location.reload();
            // Optionally, redirect the user to the login page or home page
            // window.location.href = '/login'; // Uncomment if redirection is needed
        } else {
            console.log("No user is logged in.");
        }
    };
  return (
    <nav className=" p-4 shadow-md">
    <div className="container mx-auto flex items-center justify-between">
      
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button
          className="text-black focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
  
      {/* Links */}
      <div className={`md:flex items-center space-x-6 text-white ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <NavLink
          to="/"
          className="text-black text-lg font-semibold hover:text-gray-600 transition duration-300"
        >
          Home
        </NavLink>
        <NavLink
          to="/EmployList"
          className="text-black text-lg font-semibold hover:text-gray-600 transition duration-300"
        >
          Employee List
        </NavLink>
      </div>
  
      {/* User Info and Logout */}
      <div className={`md:flex items-center space-x-4 text-white ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <p className="font-medium text-black">{info.username}</p>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
  
  )
}

export default Navbar