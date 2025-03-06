import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

dotenv.config()
const SECTRET_KEY = process.env.SECTRET_KEY
export const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECTRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token. Authentication failed." });
    }
};
