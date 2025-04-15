import { Post } from "../models/postModel.js"
import { Report } from "../models/Report.js"
import { User } from "../models/userModels.js"
import ReportedPost from "../ReportedPost.js"

//MAKING OF A REPORT OF A USER
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


//REPORTING OF A POST

    export const postReport = async (req,res)=>{
        const { postId} = req.params
        const userId = req.user.id
        const { reason } = req.body

        try {
            if(!postId || !userId ||!reason ){
                return res.status(400).json({message:"please input all fields"})
            }

            const existingPostId = await Post.findById(postId)
            if (!existingPostId){
                return res.json({message:"post doeas not exist"})
            }

            const existingPostReport = await ReportedPost.findOne({
                postId:postId,
                userId: userId
            })
            if (existingPostReport){
                return res.json({message:"you have already reported this post. "})
            }
            const user = await User.findById(userId)
            if(!user){
                return res.json({message:"please log in"})
            }

            const newReportedPost = new ReportedPost({
                postId,userId,reason
            })
            await newReportedPost.save()
            res.json({ message: "report post succesfull", newReportedPost })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }