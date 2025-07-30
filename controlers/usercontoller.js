
const mongoose = require("mongoose")
const connectDb = require("../config/connectDb");
const usermodel = require("../model/usermodel");
const bcrypt = require("bcrypt");
const appointmentmodel = require("../model/appointment");
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
        const {mail,password}=req.body;

        if(!mail || !password){
            console.log("fill all details");
        return res.status(200).json({message : "error! fill details are mandatory..."});
        }
        const user = await usermodel.findOne({mail:mail});
        if(user && (await bcrypt.compare(password,user.password))){
            const accessToken = jwt.sign({
                user : {
                    name : user.name,
                    mail : user.mail,
                    id : user.id
                },
            },process.env.ACCESS_TOKEN,
            {expiresIn : "1week"}
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
const getDoctorsForUser = asyncHandler(async(req,res)=>{
//     console.log(req.user);
// const doctor = await doctormodel.findOne({userId:new mongoose.Types.ObjectId("686df239d456b8672ec7c2d7")})
// console.log(doctor)
    const doctorData = await doctormodel.find({status:"approved"}); 
    if(doctorData){
        res.status(200).send(doctorData)
    }
    else{
        res.status(404).send({message : "docotrdata is not found"});
    }
})
const bookdoctor = asyncHandler(async(req,res)=>{
    const {doctorId} = req.params;
    const {user} = req;
    console.log(user);
    const doctordata = await doctormodel.findOne({_id:doctorId});
    const userdata = await usermodel.findOne({name:user.name});
    const exists = appointmentmodel.findOne({"doctor.id":doctorId,"user.id":userdata._id});
    if(!exists){
        return res.status(404).json({message:"User is already exists.."});
    }
    else{
    const appointmentdata = new appointmentmodel({
        user:{
            name:userdata.name,
            id:userdata.id,
        },
        doctor : {
            name:doctordata.name,
            id:doctordata.id
        },
        status:"pending",
        document:"WWW.doctor.com"
    })
    await appointmentdata.save();
    res.status(200).send(appointmentdata); 
}})
const appointment = asyncHandler(async(req,res)=>{
    admindata = await appointmentmodel.find();
    if(!admindata){
        return res.status(400).json({message:"appointment data is not found"});
    }else{
        res.status(200).json(admindata);
    }
})
const applyfordoctor = asyncHandler(async(req,res)=>{
            const {timing,experience,fee,specialization,address}=req.body;
            const {user} =req;
            const userdata = await usermodel.findById(user.id) 
            console.log("hello")
            console.log(userdata);
            console.log("hii")
            if(!timing ||!experience || !fee || !specialization ||!address){
                res.status(400).json({message : "fill all the details"});
            }
            else{
                const doctordata = new doctormodel({
                    userId : userdata.id,
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
}});
const getDoctorsForAdmin = asyncHandler(async(req,res)=>{
    doctordata = await doctormodel.find();
    if(doctordata){
        res.status(200).json({data:doctordata});
    }
    else{
        res.status(400).json({message:"doctordata is not found.."});
    }
})
const UpdateDoctorStatus = asyncHandler(async(req,res)=>{
    const {status} = req.body;
    const {doctorId} =req.body;
    const doctordata =await doctormodel.findById(doctorId);
    doctordata.status = status;
    await doctordata.save();
    res.status(200).json({message:"succesfully updated..."});
})
module.exports = {register,login,currentUser,getDoctorsForUser,bookdoctor,appointment,applyfordoctor,getDoctorsForAdmin,UpdateDoctorStatus};


