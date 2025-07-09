const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userinfo : {
        name : {
            type : String,
            required : true
        }   
    },
    status : {
        type:String,
        enum:['pending','approved']
    },
    doctorinfo:{
        name:{
            type:String,
            required:true
        }
    },
    document :{
        type:String,
        required:true
    }
 },
    {
        timestamps:true
    }
)
const appointment = mongoose.model('appointment',appointmentSchema)
module.exports = appointment