import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../context/appContext';
import {toast} from "react-hot-toast";
import Navbar from './Navbar';

const AddEmploy = () => {
    const {url} = useAppContext();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    // console.log(data);
    let formData = new FormData();

  
    // Append all the form data fields including the image
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('mobile', data.mobNo);
    formData.append('designation', data.designation);
    formData.append('gender', data.gender);
    formData.append('course', data.course);
    formData.append('image', data.image[0]); // Assuming `data.image` is an array due to file input
  
    try {
      const resp = await fetch(`${url}/api/employee/create`, {
        method: "POST",
        headers: {
          // Do not set Content-Type when sending FormData
        },
        body: formData, // Send the formData instead of JSON
      });
  
      if (!resp.ok) {
        throw new Error(`Something went wrong: ${resp.status} ${resp.statusText}`);
      }
  
      const result = await resp.json();
      console.log(result);
      toast.success("Employee Created ")
    } catch (error) {
      console.error(error.message);
    }
  };
  

  return (
    <>
    <Navbar/>
    <div className="text-left px-3 py-2 mt-3">
    <div className="text-left px-3 py-2 mt-3">
        <span className="bg-slate-500 p-3 rounded-lg text-white">Create Employee</span>
    </div>
</div>

<form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 text-left" onSubmit={handleSubmit(onSubmit)}>

  {/* Name Field */}
  <div className="mb-4">
    <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-800">Name</label>
    <input
      type="text"
      id="name"
      {...register('name', { required: true })}
      className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Enter name"
    />
    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
  </div>

  {/* Email Field */}
  <div className="mb-4">
    <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-800">Email</label>
    <input
      type="email"
      id="email"
      {...register('email', { required: true })}
      className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Enter email"
    />
    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
  </div>

  {/* Mobile Number Field */}
  <div className="mb-4">
    <label htmlFor="mob-no" className="block mb-2 text-sm font-semibold text-gray-800">Mobile No</label>
    <input
      type="text"
      id="mob-no"
      {...register('mobNo', { required: true })}
      className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Enter mobile number"
    />
    {errors.mobNo && <span className="text-red-500 text-sm">Mobile number is required</span>}
  </div>

  {/* Designation Field */}
  <div className="mb-4">
    <label htmlFor="designation" className="block mb-2 text-sm font-semibold text-gray-800">Designation</label>
    <select
      id="designation"
      {...register('designation', { required: true })}
      className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="HR">HR</option>
      <option value="Manager">Manager</option>
      <option value="Sales">Sales</option>
    </select>
    {errors.designation && <span className="text-red-500 text-sm">Designation is required</span>}
  </div>

  {/* Gender Field */}
  <div className="mb-4">
    <label className="block mb-2 text-sm font-semibold text-gray-800">Gender</label>
    <div className="flex items-center space-x-4">
      <label className="flex items-center">
        <input
          type="radio"
          {...register('gender', { required: true })}
          value="M"
          className="form-radio text-blue-500"
        /> Male
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          {...register('gender', { required: true })}
          value="F"
          className="form-radio text-blue-500"
        /> Female
      </label>
    </div>
    {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}
  </div>

  {/* Courses Field */}
  <div className="mb-4">
    <label className="block mb-2 text-sm font-semibold text-gray-800">Courses</label>
    <div className="flex items-center space-x-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          {...register('course')}
          value="MCA"
          className="form-checkbox text-blue-500"
        /> MCA
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          {...register('course')}
          value="BCA"
          className="form-checkbox text-blue-500"
        /> BCA
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          {...register('course')}
          value="BSC"
          className="form-checkbox text-blue-500"
        /> BSC
      </label>
    </div>
    {errors.course && <span className="text-red-500">{errors.course.message}</span>}
  </div>

  {/* Image Upload Field */}
  <div className="mb-4">
    <label htmlFor="image" className="block mb-2 text-sm font-semibold text-gray-800">Image Upload</label>
    <input
      type="file"
      id="image"
      {...register('image', { required: true })}
      className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
  </div>

  {/* Submit Button */}
  <div className="flex justify-center">
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
    >
      Submit
    </button>
  </div>
</form>

    </>
   
  );
};

export default AddEmploy;
