const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,

    },
    mail :{
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    isdoctor : {
        type : Boolean,
        required : true
    },
    notification : {
        type : String,
        required : false
    },
    type : {
        type : String,
        enum : ['admin','user'],
        required : true
    },
},{
    timestamps : true,
});
const usermodel = mongoose.model("User",userSchema)
module.exports = usermodel