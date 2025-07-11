const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { model } = require("mongoose");
const usermodel = require("../model/usermodel");

const validateToken =asyncHandler (async(req,res,next) =>{
    let token;
    let authHeader = req.headers["authorization"];
    console.log(authHeader)
    if(!authHeader){
        return res.status(400).json({message:"Not token found"})
    }else{
           token = authHeader.split(" ")[1];
        console.log(token);
        console.log("JWT secret during verification :",process.env.ACCESS_TOKEN);
        jwt.verify(token , process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err){
            res.status(401);
            throw new Error("User is not authorized");
        }
        console.log("decode:")
         req.user = decoded.user; // attach user info to req
         console.log(decoded)})
        next();
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
const validateadminToken = asyncHandler(async(req,res,next)=>{
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).json({message:"Token not found"});
    }
    else{
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,async(err,decode)=>{
            if(err){
                return res.status.json({message:"authorization is not found..."});
            }
            else{
                console.log("decode: ");
                console.log(decode);
                req.user= decode.user;
                const userdata = await usermodel.findOne({_id:decode.user.id});
                console.log(userdata);
                if(userdata.type === 'admin'){
                    console.log("Admin data is found..");
                    next();
                }
                else{
                    console.log("Admin data is not found..");
                    return res.status(402).json("authorized-access denied..");
                }
            }
        })
    }
})
module.exports = {validateToken,validateadminToken};