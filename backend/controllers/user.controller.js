import { ErrorHandler } from "../utils/error.util.js"
import {User} from "../models/user.models.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {verifyToken} from '../middleware/auth.middleware.js'
export const registerUser=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(
        [username,email,password].some((feild)=>feild?.trim()=="")
    ){
        return res.status(401).json({message: "All feilds are required" });
    }
    const existedUser=await User.findOne({
        $or:[{email},{username}]
     })
     if(existedUser){
      return res.status(401).json({message: "User already exist" });
     }
     const hashedPassword=bcryptjs.hashSync(password,10);
     const user=await User.create({
        username:username.toLowerCase(),
        email,
        password:hashedPassword,
     })
     const createduser=await User.findById(user._id).select(
        "-password"
     )
     if(!createduser){
       return res.status(500).json({message: "Internal server error"})
     }
     return res.status(200).json({message:"User created successfully"})
}

export const signIn=async(req,res,next)=>{
   const {email,password}=req.body;
   if(email.trim()==""){
      return res.status(400).json({message:"Email is required"})
   }
   const user=await User.findOne({email})
   if(!user){
      return res.status(400).json({message:"User does not exist"})
   }
   const validPassword=bcryptjs.compareSync(password,user.password);
   if(!validPassword){
      return res.status(402).json({message:"Credentials are not correct"})
   }
   const token=jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET
   )
   const expiryDate=new Date(Date.now()+36000000)
   const options={
      httpOnly:true,
      expires:expiryDate   
   }
   const LoggedInUser=await User.findById(user._id).select("-password")
   return res
   .status(200)
   .cookie('accessToken',token,options)
   .json(LoggedInUser)
}

export const SignOut=async(req,res)=>{
    const options={
      httpOnly:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .json({message:"User logged out successfully"})
}

export const CheckAuth=async(req,res)=>{
   return res.status(200).json(req.user)
}