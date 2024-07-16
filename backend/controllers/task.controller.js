import { Task } from '../models/task.models.js'
import validObjectId from '../utils/validation.js'
export const createTask = async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ message: "Description is required" })
        }
        const task = await Task.create({
            description,
            owner: req.user._id
        })
        return res.status(200).json({ message: "Task created successfully", data: task })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const getAllTask = async (req, res) => {
    try {
        const task = await Task.find({
            owner: req.user._id
        })
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const EditTask = async (req, res) => {
    try {
        const id = req.params.taskId;
        const { description } = req.body;
        if (!validObjectId(id)) {
            return res.status(400).json({ message: "Choose some task" })
        }
        if (!description) {
            return res.status(401).json({ message: "Description must be provided" })
        }
        const task = await Task.findById(id);
        if (!task) {
            return res.status(403).json({ message: "No task found" })
        }
        if (!task.owner.equals(req.user._id)) {
            console.log(task.owner)
            console.log(req.user._id)
            return res.status(404).json({ message: "You cannot edit another user task" })
        }
        const newtask = await Task.findByIdAndUpdate(req.params.taskId, { description }, { new: true })
        return res.status(200).json({ message: "Task updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Server error..." })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        if (!validObjectId(taskId)) {
            return res.status(400).json({ message: "Task choosen is not valid" })
        }
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "No task found" })
        }
        if (!task.owner.equals(req.user._id)) {
            return res.status(404).json({ message: "You cannot delete another user task" })
        }
        const deletetask = await Task.findByIdAndDelete(taskId);
        return res.status(200).json({ message: "Task deleted" })
    } catch (error) {
        return res.status(500).json({ message: "Server error..." })
    }
}