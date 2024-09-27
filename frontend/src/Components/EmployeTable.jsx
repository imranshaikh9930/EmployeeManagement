import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { useAppContext } from "../context/appContext";

const EmployeTable = () => {
    const { url, setSelected } = useAppContext();
    const [employee, setEmployee] = useState([]);
    const [search, setSearch] = useState('');

    // Fetch employee data based on search query
    const getEmployee = async (search = "") => {
        const baseUrl = `${url}/api/employee/get-all?search=${search}`;

        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await fetch(baseUrl, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const  data  = await response.json();

            // console.log(data.data);
            
            // Assuming 'data' contains an array of employees
            setEmployee(data.data);

        } catch (error) {
            console.error("Failed to fetch employees:", error);
            setEmployee([]);  // Set an empty array if there is an error
        }
    };

    // Delete employee
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${url}/api/employee/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Refetch employee list after delete
            getEmployee(search);
        } catch (error) {
            console.error("Failed to delete employee:", error);
        }
    };

    // Set selected employee for editing
    const handleUpdate = (emp) => {
        setSelected(emp);
    };

    // Format date to 'dd-MMM-yy'
    const formattedDate = (date) => {
        const options = { day: 'numeric', month: 'short', year: '2-digit' };
        return new Date(date).toLocaleDateString('en-GB', options).replace(/(\d{1,2})\s([a-zA-Z]{3})\s(\d{2})/, '$1-$2-$3');
    };

    // Fetch employees on component mount and when search changes
    useEffect(() => {
        getEmployee(search);
    }, [search]);

    return (
        <>
            <Navbar />
            <div className="flex justify-center my-16 h-[90vh]">
    <div className="relative overflow-x-auto sm:rounded-lg w-full max-w-7xl shadow-lg p-5 bg-white dark:bg-gray-900">
        <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100">Employee List</h2>
            <NavLink to="/create-emp" className="bg-slate-400 text-white px-4 py-2 rounded-lg hover:bg-slate-500 transition duration-300">
                Create Employee
            </NavLink>
        </div>

        <div className="flex justify-end mb-4">
            <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 border rounded-lg shadow-md focus:ring focus:ring-blue-200 transition duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Id</th>
                    <th scope="col" className="px-6 py-3">Image</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Mobile No</th>
                    <th scope="col" className="px-6 py-3">Designation</th>
                    <th scope="col" className="px-6 py-3">Gender</th>
                    <th scope="col" className="px-6 py-3">Course</th>
                    <th scope="col" className="px-6 py-3">Create Date</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {employee.map((emp, index) => (
                    <tr
                        key={index}
                        className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{index + 1}</td>
                        <td className="px-6 py-4">
                            <img
                                src={`${url}/${emp.image.replace(/\\/g, '/')}`}
                                alt={emp.name}
                                className="w-10 h-10 object-cover rounded-full border"
                            />
                        </td>
                        <td className="px-6 py-4">{emp.name}</td>
                        <td className="px-6 py-4">{emp.email}</td>
                        <td className="px-6 py-4">{emp.mobile}</td>
                        <td className="px-6 py-4">{emp.designation}</td>
                        <td className="px-6 py-4">{emp.gender}</td>
                        <td className="px-6 py-4">{emp.course}</td>
                        <td className="px-6 py-4">{formattedDate(emp.updatedAt)}</td>
                        <td className="px-6 py-4 flex items-center space-x-3">
                            <NavLink
                                to="/update-emp"
                                onClick={() => handleUpdate(emp)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Edit
                            </NavLink>
                            <button
                                onClick={() => handleDelete(emp._id)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Mobile responsive layout for smaller screens */}
        <div className="block md:hidden">
            {employee.map((emp, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
                    <div className="flex items-center space-x-4">
                        <img
                            src={`${url}/${emp.image.replace(/\\/g, '/')}`}
                            alt={emp.name}
                            className="w-14 h-14 object-cover rounded-full border"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{emp.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{emp.email}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{emp.mobile}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-semibold">Designation:</span> {emp.designation}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-semibold">Gender:</span> {emp.gender}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-semibold">Course:</span> {emp.course}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-semibold">Created At:</span> {formattedDate(emp.updatedAt)}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <NavLink
                            to="/update-emp"
                            onClick={() => handleUpdate(emp)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Edit
                        </NavLink>
                        <button
                            onClick={() => handleDelete(emp._id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>

        </>
    );
};

export default EmployeTable;
