import jwt from 'jsonwebtoken';
import { User } from '../models/userModels.js';
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1]; // Correct token extraction
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, "welcome");

        // Fetch user and attach to request
        req.user = await User.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        res.status(403).json({ message: 'unathorized' });
    }
};

