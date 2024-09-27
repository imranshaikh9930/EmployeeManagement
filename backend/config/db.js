const mongoose =require('mongoose');



const dbConnection = async()=>{

    try {
           const connnect =await  mongoose.connect(process.env.MONGO_URI);

           console.log("MongoDb Connected SuccessFully")
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = dbConnection;