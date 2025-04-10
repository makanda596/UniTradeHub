import { User } from "../models/userModels.js"

export const makeReport = async (req,res)=>{
    const { reportedId }= req.params
    const reporterId= req.user.id
    
    try {
        const existingreportedId = await User.findById(reportedId)
        if (!existingreportedId){
            return res.json({message:"user not found"})
        }
        const existingreporterId = await User.findById(reporterId)
        if (!existingreporterId) {
            return res.json({ message: "please log in first" })
        }
    } catch (error) {
        
    }
}