
const connectDb = require("../config/connectDb");
const usermodel = require("../model/usermodel");
const bcrypt = require("bcrypt");
const appointment = require("../model/appointment");
const doctormodel = require("../model/doctormodel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req,res) =>{
    const{name,mail,phone,password,type,isdoctor}=req.body;

    if(!mail || !name || !phone || !password|| !type || !isdoctor){
        return res.status(500).json({message : "error! give data is invalid.."});
    }
    const userexits = await usermodel.find({mail:mail});
    // console.log(userexits);
    if(userexits.length>0){
        res.status(400).json({message: "user is alread exits.."})
    }else{
    const hashpassword = await bcrypt.hash(password,10);
    // console.log(hashpassword);

    const userdata = new usermodel({
        name,
        mail,
        password : hashpassword,
        phone,
        type,
        isdoctor,
    });
   
        const saveuser = await userdata.save(); 
         const accessToken = jwt.sign({
                user : {
                    name : saveuser.name,
                    mail : saveuser.mail,
                    id : saveuser.id
                },
            },process.env.ACCESS_TOKEN,
            {expiresIn : "1h"}
        )
            console.log("User Token : ",process.env.ACCESS_TOKEN);
         if(isdoctor === "true"){
            const {timing,experience,fee,specialization,address}=req.body;
            if(!timing ||!experience || !fee || !specialization ||!address){
                res.status(400).json({message : "fill all the details"});
            }else{
                const doctordata = new doctormodel({
                    userId : userdata._id,
                    name:userdata.name,
                    mail : userdata.mail,
                    phone: userdata.phone,
                    timing,
                    experience,
                    fee,
                    specialization,
                    address
                })
                const doctsave = await doctordata.save();
                return res.status(200).json({message : "doctor created successfully",data:doctsave})
            }
         }   
        const resultData = {
            message:"User created Successfully",
            token:accessToken
        }
        res.status(400).json({message : resultData});
        console.log("user data is Stored succesfully");
}
});

const login = asyncHandler(async (req,res)=>{
    console.log("enter in to login page");
        const {name,password}=req.body;
        if(!name || !password){
            console.log("fill all details");
        return res.status(200).json({message : "error! fill details are mandatory..."});
        }
        const user = await User.findOne({name});
        if(user && (await bcrypt.compare(password,user.password))){
            const accessToken = jwt.sign({
                user : {
                    name : user.name,
                    mail : user.mail,
                    id : user.id
                },
            },process.env.ACCESS_TOKEN,
            {expiresIn : "1h"}
        )
            console.log("User Token : ",process.env.ACCESS_TOKEN);
            res.status(200).json({accessToken,message:'LOGIN SUCCESSFULL'});
        }
        else{
            res.status(404);
            throw new Error("Invalid password...");
        }
        
    });
const currentUser = async(req,res) =>{
    console.log("validating currentUser");
    res.send("validating current User");
}
module.exports = {register,login,currentUser};



