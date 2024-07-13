import mongoose from 'mongoose'

const taskSchema=mongoose.Schema({
       description:{
         type:String
       },
       owner:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
       }
},{
    timestamps:true
})

export const Task=mongoose.model("Task",taskSchema)