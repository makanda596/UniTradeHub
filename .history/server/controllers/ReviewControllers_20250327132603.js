import { Review } from "../models/Review.js"
import { User } from "../models/userModels.js"
import { userprofile } from "./userControllers.js"


export const MakeReview = async (req,res)=>{
    const senderId= req.user.id
    const {recieverId}=req.params
    const {text}=req.body

    try {
        // if(!senderId || !recieverId || !text){
        //     res.json({message:'please input all fields'})
        // }
        
        const newReview = await Review({
            senderId, recieverId,text
        })
        await newReview.save()
        res.json({message:"review posted", newReview})
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });   
    }
}

export const getReview = async (req,res)=>{
    const { recieverId }=req.params
    try {
        const existingUser = await User.findById(recieverId)
        if (!existingUser){
            res.status(400).json({message:"user not found"})
        }
        const userReviews = await Review.find({}).sort({createdBy:-1})
        existingUser.reviews.push(userReviews._id);

        res.json({ message: "user`s reviews", userReviews })
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}