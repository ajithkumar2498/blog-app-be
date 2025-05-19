import { Schema } from "mongoose";
import mongoose from "mongoose";


const postSchema = new Schema({
    
    user:{
        type:Schema.Types.ObjectId, 
        ref:"user", 
        required:true
    },
    img:{
        type:String,
    },
    author:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String
    },
    category:{
        type:String,
        default: "general"
    },
    content:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
},);

export default  mongoose.model("post",postSchema)