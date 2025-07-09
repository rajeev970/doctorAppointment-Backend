const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = async() =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECT_STRING);
        console.log("db is connected succesfully");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports={connectDb};