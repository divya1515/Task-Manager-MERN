import { Router } from "express"
import { verifyToken } from "../middleware/auth.middleware.js";
import { createTask, getAllTask, EditTask, deleteTask } from "../controllers/task.controller.js";

const router = Router();
router.route('/addTask').post(verifyToken, createTask);
router.route('/getAllTask').get(verifyToken, getAllTask);
router.route('/editTask/:taskId').post(verifyToken, EditTask);
router.route('/deleteTask/:taskId').delete(verifyToken, deleteTask)
export default router