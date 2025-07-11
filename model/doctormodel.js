const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    mail : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    timing : {
        type : String,
        required : false
    },
    experience : {
        type : String,
        required : true
    },
    status :{
        type : String,
        enum : ['pending','approved','reject'],
        default : 'pending'
    },
    fee : {
        type : Number,
        required : true
    },
    specialization : {
        type : String,
        enum : ['blood','Dermotology','Nurologist'] 
    },
    address : {
        type : String,
        required : true
    }
},
    {
        timestamps:true
    }
)
doctormodel = mongoose.model('doctormodel',doctorSchema)
module.exports = doctormodel