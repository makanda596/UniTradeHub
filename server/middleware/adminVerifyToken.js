import jwt from 'jsonwebtoken';
import { Admin } from '../models/adminModels.js';
import dotenv from 'dotenv'

dotenv.config()
export const adminVerifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.SECTRET_KEY);

        req.admin = await Admin.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        res.status(403).json({ message: 'unathorized' });
    }
};

