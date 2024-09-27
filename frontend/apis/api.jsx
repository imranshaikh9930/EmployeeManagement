// Function to get all employees
export const GetAllEmployees = async (BASE_URL, search = "") => {
    const url = `${BASE_URL}/api/employee/get-all?search=${search}`;

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();

        return data;
    } catch (error) {
        console.error("Failed to fetch employees:", error);
        return { employees: [], pagination: { currentPage: 1, pageSize: 5, totalEmployees: 0, totalPages: 0 } }; // Default value in case of error
    }
};

// Function to create an employee
export const CreateEmployee = async (BASE_URL, empObj) => {
    const url = `${BASE_URL}/api/employee`;

    const formData = new FormData();

    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }

    const config = {
        method: "POST",
        body: formData
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Failed to create employee:", error);
        throw error;
    }
};

// Function to delete an employee by ID
export const DeleteEmployeeId = async (BASE_URL, id) => {
    const url = `${BASE_URL}/api/employee/${id}`;

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"  // Corrected header
        }
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
};

// Function to update an employee by ID
export const UpdateEmployeeById = async (BASE_URL, empObj, id) => {
    const url = `${BASE_URL}/api/employee/${id}`;

    const formData = new FormData();

    for (let key in empObj) {
        formData.append(key, empObj[key]);
    }

    const options = {
        method: 'PUT',
        body: formData
    };

    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log('<---update--> ', data);
        return data;
    } catch (err) {
        return err;
    }
};
