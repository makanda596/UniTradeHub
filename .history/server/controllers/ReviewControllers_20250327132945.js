import { Review } from "../models/Review.js"
import { userprofile } from "./userControllers.js"


export const MakeReview = async (req,res)=>{
    const senderId= req.user.id
    const {recieverId}=req.params
    const {text}=req.body

    try {
        // if(!senderId || !recieverId || !text){
        //     res.json({message:'please input all fields'})
        // }
        const existingUser = await User.findById(recieverId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const newReview = await Review({
            senderId, recieverId,text
        })
        await newReview.save()
        existingUser.reviews.push(newReview._id);

        res.json({message:"review posted", newReview})
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });   
    }
}

export const getReview = async (req,res)=>{
    const { recieverId }=req.params
    try {
        if(!recieverId){
            res.status(400).json({message:"user not found"})
        }
        const userReviews = await Review.find({}).sort({createdBy:-1})
        res.json({ message: "user`s reviews", userReviews })
    } catch (error) {
         console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}