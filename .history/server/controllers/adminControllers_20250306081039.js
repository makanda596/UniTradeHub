import bcrypt from "bcrypt"
import { adminGenerateToken } from "../utilis/adminGenerateToken"
export const adminsignup = async(req,res)=>{

    const {email,password}=req.body
    try {
    
        const admin = await Admin.findOne({email})
        if(!admin){
            res.status(404).json({message: 'Email does not exist'})
        }
        const ispassword = bcrypt.compare(admin.password, password)
        if(!ispassword){
            res.status(404).json({message: 'inccorect password'})
        }
        
        adminGenerateToken(admId)
        req.session.admin={
            id:admin._id,
            email:admin.email,
        }
    } catch (error) {
        
    }
}