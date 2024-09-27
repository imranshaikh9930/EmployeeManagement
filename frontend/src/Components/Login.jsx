import React, { useState } from "react";
import {useForm} from "react-hook-form";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const {register,handleSubmit} =  useForm();   
  const [currState,setCurrState] = useState("Sign-up");
  const {url,setUser,setToken} = useAppContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let new_url = url;
  
    // Determine the appropriate endpoint based on the current state
    if (currState === "Login") {
      new_url += "/api/user/login";
    } else {
      new_url += "/api/user/register";
    }
  
    // console.log("Request URL:", new_url);
  
    try {
      // Sending a POST request using fetch
      const resp = await fetch(new_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON format is declared in headers
        },
        body: JSON.stringify(data), // Send the form data as JSON
      });
  
      // Check if the response is not OK (status 200-299)
      if (!resp.ok) {
        throw new Error(`Something went wrong: ${resp.status} ${resp.statusText}`);
      }
  
      const result = await resp.json(); // Parse the JSON response
      console.log("Response from server:", result);
  
      // If a token is received (for login), save it
      if (result.token) {
        // setToken(result.token); // Assuming `setToken` is a state updater function
        let userInfo = {
          username:result.username,
          token:result.token
        }
        
        localStorage.setItem("info",JSON.stringify(userInfo)); // Save token in local storage
        toast.success("Login Successfull")
        navigate("/"); // Navigate to home or dashboard after successful login
      }
  
      // Set the logged-in user (assumed you have a `setUser` function
      
  
    } catch (error) {
      // Log the error message for debugging
      console.error("Error:", error.message);
      toast.error("Invalid Creadentials")
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
  <div className="w-full max-w-md">
    <form 
      className="bg-white text-left rounded-xl shadow-slate-700 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 mx-auto "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
        {currState === "Sign-up" ? "Sign Up" : "Login"}
      </h2>

      {/* Name field for Sign-up only */}
      {currState === "Sign-up" && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow-sm appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            type="text"
            placeholder="Your Name"
            {...register("name")}
          />
        </div>
      )}

      {/* Username field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow-sm appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="username"
          type="text"
          placeholder="Your Username"
          {...register("username")}
        />
      </div>

      {/* Password field */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow-sm appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="password"
          type="password"
          placeholder="Your Password"
          {...register("password")}
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center w-full">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition ease-in-out duration-300 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {currState === "Sign-up" ? "Sign Up" : "Login"}
        </button>
      </div>

      {/* Toggle Login/Sign-up */}
      <div className="text-center mt-4">
        {currState === "Login" ? (
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setCurrState("Sign-up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setCurrState("Login")}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </form>
  </div>
</div>

  );
};

export default Login;
