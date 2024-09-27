const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');


const registerController = async (req, res) => {
    const {name, username, password } = req.body;

    // console.log(name,username,password);

    try {
        // Check if username or password is missing
        if (!name || !username || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Hash the password with bcrypt
        const saltRounds = parseInt(process.env.SALT, 10) || 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user object
        const user = {
            name:name,
            username: username,
            password: hashedPassword,
        };

        // Save the user in the database
        const userDoc = await User.create(user);

        // Return success response
        return res.status(200).json({
            data: {
                id: userDoc._id,
                username: userDoc.username,
                // Do not return password or sensitive information
            },
            success: true,
        });
    } catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}
const loginController = async(req,res)=>{
    const {username,password}=req.body;

    try {
        if(!username || !password){
            return res.status(400).json({message:"All fields Required"});
        }

        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({message:"Invalid username"});
        }

        const isValidPassword = await bcrypt.compare(password,user.password);

        if(!isValidPassword){
            return res.status(401).json({message:"Invalid password"});
        }

        const token = createToken(user._id);


        res.status(200).json({token,username:user.username,success:true});


    } catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

const createToken = (userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET_KEY);
}

module.exports = {registerController,loginController}