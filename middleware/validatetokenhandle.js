const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { model } = require("mongoose");

const validateToken =asyncHandler (async(req,res,next) =>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        console.log(token);
        console.log("JWT secret during verification :",process.env.ACCESS_TOKEN);
        jwt.verify(token , process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err){
            res.status(401);
            throw new Error("User is not authorized");
        }
         req.user = decoded; // attach user info to req
        next();
        console.log(decoded)})
    //      try {
    //     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    //     req.user = decoded.user;
    //     console.log("Decoded value is : ",decoded);
    //     next();
    // } catch (err) {
    //     console.error("JWT Verification failed:", err.message);
    //     res.status(401).json({ message: "User is not authorized" });
    // }
    // ;
}

});
module.exports = validateToken;