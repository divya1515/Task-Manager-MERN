import {Task} from '../models/task.models.js'
export const createTask=async(req,res)=>{
    try{
    const {description}=req.body;
    if(!description){
        return res.status(400).json({message:"Description is required"})
    }
    const task=await Task.create({
        description,
        owner:req.user._id
    })
    return res.status(200).json({message:"Task created successfully"})
}catch(error){
    return res.status(500).json({message:"Something went wrong"})
}
}

export const getAllTask=async(req,res)=>{
    try{
         const task=await Task.find({
            owner:req.user._id
         })
         return res.status(200).json(task);
    }catch(error){
        return res.status(500).json({message:"Something went wrong"})
    }
}