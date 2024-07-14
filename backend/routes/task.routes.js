import {Router} from "express"
import { verifyToken } from "../middleware/auth.middleware.js";
import { createTask,getAllTask } from "../controllers/task.controller.js";

const router=Router();
router.route('/addTask').post(verifyToken,createTask);
router.route('/getAllTask').get(verifyToken,getAllTask);
export default router