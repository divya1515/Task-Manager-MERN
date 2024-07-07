import mongoose from 'mongoose'

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            lowercase:true,
            required:true,
            trim:true,
            unique:true
        },
        email:{
           type:String,
           lowercase:true,
           required:true,
           unique:true,
           trim:true,
        },
        password:{
          type:String,
          required:[true,"Password is required"]
        }
    },
    {
        timestamps:true
    }
)
export const User=mongoose.model("User",userSchema)