import { ErrorHandler } from "../utils/error.util.js"
import {User} from "../models/user.models.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const registerUser=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(
        [username,email,password].some((feild)=>feild?.trim()=="")
    ){
        return next(ErrorHandler(401,"All feilds are required"));
    }
    const existedUser=await User.findOne({
        $or:[{email},{username}]
     })
     if(existedUser){
        return next(ErrorHandler(401,"User already exist"))
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
       return next(ErrorHandler(500,"Internal server error"))
     }
     return res.status(200).json({message:"User created successfully"})
}

export const signIn=async(req,res,next)=>{
   const {email,password}=req.body;
   if(email.trim()==""){
      return next(ErrorHandler(400,"Email is required"))
   }
   const user=await User.findOne({email})
   if(!user){
      return next(ErrorHandler(400,"User does not exist"))
   }
   const validPassword=bcryptjs.compareSync(password,user.password);
   if(!validPassword){
      return next(ErrorHandler(402,"Credentials are not correct"))
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