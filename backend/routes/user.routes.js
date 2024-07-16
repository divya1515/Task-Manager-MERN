import { Router } from "express"
import { registerUser, signIn, SignOut, CheckAuth } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();
router.route("/register").post(registerUser)
router.route("/signin").post(signIn)
router.route("/signOut").get(verifyToken, SignOut)
router.route("/verify").get(verifyToken, CheckAuth)
export default router