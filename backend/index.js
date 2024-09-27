const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require('path');

const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const employRoutes = require("./routes/employRoutes");
// const employeeRoutes = require("./routes/employeeRoutes"); // Uncomment when the employee routes are ready

const app = express();
// var corsOptions = {
//     origin: 'http:localhost:5173',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }



// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors())

// PORT
const PORT = process.env.PORT || 5050;

// Database connection
db();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/employee", employRoutes);
app.use('/images/uploads', express.static(path.join(__dirname, 'images/uploads')));
// app.use("/api/employee", employeeRoutes); // Uncomment if you have employee routes ready


app.get("/",(req,res)=>{

    res.send("Hello from Imran");
})
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
