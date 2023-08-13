const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        userId :{
            type:String,
            required : true
        },
        firstName : {
            type:String,
            require:true,
        },
        lastName :{
            type:String,
            require:true,
        },
        location         : String,
        description      : String,
        picturePath      : String,
        userPicturePath  : String,
        likes :{
            type : Map,
            of : Boolean
        },
        comments :{
            types:Array,
            default:[]
        }                                              
    },
    {timestamps:true}
)


const Post = mongoose.model("Post" ,postSchema)
module.exports = Post