import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECTRET_KEY = process.env.SECTRET_KEY

export const UsersetCookieGenerateToken = async (res, userId) => {
    try {
        const token = jwt.sign({ userId }, SECTRET_KEY, { expiresIn: "15 min" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
        })
        if (!token) {
            res.status(404).json({ message: "token not provided" })
            return 0;
        }
        return token
    } catch (error) {
        res.status(404).json(error.message)
    }
}