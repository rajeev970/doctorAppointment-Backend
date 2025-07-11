const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user : {
            name:{
                type:String,
                required:true
            },
            id:{
                type:mongoose.Types.ObjectId,
                required:true
            }
    },
    status : {
        type:String,
        enum:['pending','approved'],
        default:"pending"
    },
    doctor:{
        name:{
            type:String,
            required:true
        },
        id:{
            type:mongoose.Types.ObjectId,
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
const appointmentmodel = mongoose.model('appointment',appointmentSchema)
module.exports = appointmentmodel