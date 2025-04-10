import { Report } from "../models/Report.js"
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

        const newReport = new Report({
            reportedId,reporterId
        })
        await newReport.save()
        existingreportedId.reports.push(newReport._id)

        await existingreportedId.save()
        res.status(200).json({message:"succesfully reported the user", newReport})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const countReports = async (req,res)=>{
    const {reportedId:id } = req.params

    try {
        const count = Report.countDocuments({id})
     
        res.json({message:"count",count})
    } catch (error) {
        res.status(400).json(error.messages)
    }
}