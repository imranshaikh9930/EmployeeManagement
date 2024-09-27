const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{

    const token= req.headers.authorization;
    if(!token){
        return res.json({success:false,message:"Not Authorized Please Login"});

    }
    try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        
       console.log(token_decode);
       req.body.userId = token_decode.userId;
       next();
    } catch (error) {
        return res.json({success:false,message:error.message})
    }


};


module.exports = auth;