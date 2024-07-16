import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken
        if (!token) {
            return res.status(400).json({ message: "Unauthorized request" });
        }
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedtoken.id).select("-password");
        if (!user) {
            return res.status(405).json({ message: "Unauthorized request" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}