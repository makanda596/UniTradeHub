
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECTRET_KEY = process.env.SECTRET_KEY
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token //we extracting the token from the cookies whichthe user sent 
        if (!token) {
            return res.status(404).json({ message: "." })
        }
        const user = jwt.verify(token, SECTRET_KEY)
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "." });
    }
}