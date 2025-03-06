import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const SECTRET_KEY = process.env.SECTRET_KEY

export const adminGenerateToken = async (res, admId)=>{

    try{
        const token = jwt.sign({admId}, SECTRET_KEY, {expiresIn:"2min"} )
        res.cookie("token",token, {
            sameSite:true,
            htttpOnly:true,
            maxAge:2000
        })
        if(!token){
            res.status(401).json({message:"Invalid token"})
            return 0
        }
        return token 
    }catch(error){
        res.status(404).json(error)

    }
}