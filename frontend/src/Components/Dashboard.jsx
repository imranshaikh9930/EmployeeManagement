import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'

const Dashboard = () => {
  return (
  
      
      <>
  <Navbar />

  {/* Dashboard Section */}
  <section className="min-h-screen flex flex-col justify-center items-center  p-6">
    <h1 className="text-6xl font-extrabold text-black text-center animate-fadeIn">
      Welcome to the Dashboard
    </h1>
    <p className="text-lg mt-4 text-black text-center max-w-lg">
      Manage all your tasks, track your progress, and stay on top of everything with ease.
    </p>

    {/* Call to Action Button */}
    <NavLink
      to="EmployList"
      className="mt-8 bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Get Started
    </NavLink>
  </section>
</>

   
  )
}

export default Dashboard