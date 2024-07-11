import express from 'express'

const app=express()
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.json({limit:"16kb"}))

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Backend Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)

export {app}