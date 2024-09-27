const mongoose = require("mongoose");

const employSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        enum:["HR","Manager","Sales"],
        required:true
    },
    gender:{
        type:String,
        enum:["M","F"],
        required:true
    },
    course:{
        type:String,
        enum:["MCA","BCA","BSC"],
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model("Employee",employSchema);