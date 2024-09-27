import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";  // Assuming Navbar is another component
import { useAppContext } from "../context/appContext";
import {toast} from "react-hot-toast";

const UpdateEmployee = ({ employee }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const {url} = useAppContext();
  
    useEffect(() => {
        // Pre-fill the form with existing employee data

        console.log(employee)
        if (employee) {
            setValue("name", employee.name);
            setValue("email", employee.email);
            setValue("mobile", employee.mobile);
            setValue("designation", employee.designation);
            setValue("gender", employee.gender);
            setValue("course", employee.course);  // Handle multi-checkboxes accordingly
        }



        // console.log(employee);
    }, [employee, setValue]);

    const onSubmit = async (data) => {


        console.log(data)
        const imageFile = data.image && data.image.length > 0 ? data.image[0] : null;
    
       
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('mobile', data.mobile);
        formData.append('designation', data.designation);
        formData.append('gender', data.gender);
        formData.append('course', data.course);
    
       
        if (imageFile) {
            formData.append('image', imageFile);
        }
    
        try {   
            const id = employee._id; 
        
            const resp = await fetch(`${url}/api/employee/${id}`, {
                method: 'PUT',
                body: formData,
            });
    
         
            if (!resp.ok) {
                const errorMessage = await resp.text(); 
                throw new Error(`HTTP error! Status: ${resp.status}, Message: ${errorMessage}`);
            }
        
            const updatedData = await resp.json();  
            toast.success("Employee Updated Successfully");
    
        } catch (error) {
            console.error("Failed to update employee:", error); 
            toast.error(`Failed to update employee. ${error.message}`);
        }
    };
    

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-5">
    <div className="text-left px-3 py-2 mt-3">
        <span className="bg-slate-500 p-3 rounded-lg text-white">Update Employee</span>
    </div>

    <form className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input
                type="text"
                id="name"
                {...register('name', { required: "Name is required" })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input
                type="email"
                id="email"
                {...register('email', { required: "Email is required" })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        <div className="mb-5">
            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">Mobile No</label>
            <input
                type="text"
                id="mobile"
                {...register('mobile', { required: "Mobile number is required" })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
        </div>

        <div className="mb-5">
            <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900">Designation</label>
            <select
                id="designation"
                {...register('designation', { required: "Designation is required" })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
            {errors.designation && <span className="text-red-500">{errors.designation.message}</span>}
        </div>

        <div className="mb-5 flex items-center gap-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-900">Gender</label>
            <div>
                <input
                    type="radio"
                    id="gender-male"
                    {...register('gender', { required: "Gender is required" })}
                    value="M"
                    className="mr-1"
                /> M
            </div>
            <div>
                <input
                    type="radio"
                    id="gender-female"
                    {...register('gender', { required: "Gender is required" })}
                    value="F"
                    className="ml-2 mr-1"
                /> F
            </div>
            {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
        </div>

        <div className="mb-5 flex items-center gap-4">
            <label htmlFor="course" className="block text-sm font-medium text-gray-900">Course</label>
            <div className="flex flex-wrap gap-4">
                <div>
                    <input
                        type="checkbox"
                        id="course-mca"
                        {...register('course', { required: "Course is required" })}
                        value="MCA"
                        className="mr-2"
                    /> MCA
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="course-bca"
                        {...register('course')}
                        value="BCA"
                        className="ml-4 mr-2"
                    /> BCA
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="course-bsc"
                        {...register('course')}
                        value="BSC"
                        className="ml-4"
                    /> BSC
                </div>
            </div>
            {errors.course && <span className="text-red-500">{errors.course.message}</span>}
        </div>

        <div className="mb-5">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image upload</label>
            <input
                type="file"
                id="image"
                {...register('image', { required: "Image is required" })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.image && <span className="text-red-500">{errors.image.message}</span>}
        </div>

        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300">Submit</button>
    </form>
</div>

           
        </>
    );
};

export default UpdateEmployee;
