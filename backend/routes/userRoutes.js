const express = require("express");
const { registerController, loginController } = require("../controllers/userController");

const router = express.Router();

// Route for user registration
router.post("/register", registerController);

// Route for user login
router.post("/login", loginController);

module.exports = router;
