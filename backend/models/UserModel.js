const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema(
    {
        firstName : {
            type:String,
            require:true,
        },
        lastName :{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password :{
            type:String,
            require:true,
            min:8,
            // select :false
        },
        picturePath : {
            type:String,
            default:""
        },
        friends :{
            type:Array,
            default:[]
        },
        location     : String,
        occupation   : String,
        viewedProfile: Number,
        impressions  : Number
    },
    {timestamps:true}
)

const User = mongoose.model("User" ,UserSchema)
module.exports = User