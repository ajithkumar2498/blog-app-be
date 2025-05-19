import { Schema } from "mongoose";
import mongoose from "mongoose";

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

const userSchema = new Schema(
  {
     name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        validate:{
            validator: (value)=>validateEmail(value)
        }
    },
    password:{
        type:String,
        required:[true,'Password is required'],
    },
    status:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
  },
  {
    collection:'users',
    versionKey:false
}
);


export default  mongoose.model("user",userSchema)