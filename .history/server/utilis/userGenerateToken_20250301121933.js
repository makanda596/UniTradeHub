import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECTRET_KEY = process.env.SECTRET_KEY
export const userGenerateTokenAndSetCookie = (res,email)=>{
    try {
        const token = jwt.sign({ email }, SECTRET_KEY,{expiresIn:"1min"})
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            // maxAge:
            secure: false, // if using HTTPS
        })
        if(!token){
         res.status(403).json({message:"no token provided"})
            return 0;
        }
        return token
    } catch (error) {
        res.status(404).json(error.message)

    }
}