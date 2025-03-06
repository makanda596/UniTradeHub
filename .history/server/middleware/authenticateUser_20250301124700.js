import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()
const SECTRET_KEY = process.env.SECTRET_KEY
export const authenticateUser = async (req, res, next) => {
//     const token = req.header("authorization"); 

//     if (!token) {
//         return res.status(401).json({ error: "Unauthorized. No token provided." });
//     }
//   const  token = token.split("")[1]
//     try {
//         const user = jwt.verify(token, SECTRET_KEY)
//         req.user = user
//         next();
//     } catch (error) {
//         res.status(401).json({ error: "Invalid token. Authentication failed." });
//     }
const token = req.header("authorization")
console.log(token)
res.send(token)
};
