import { Review } from "../models/Review.js"
import { User } from "../models/userModels.js"


export const MakeReview = async (req, res) => {
    const senderId = req.user.id;
    const { receiverId } = req.params; // Fixed typo (receiverId instead of recieverId)
    const { text } = req.body;

    try {
        if (!senderId || !receiverId || !text) {
            return res.status(400).json({ success: false, message: "Please input all fields" });
        }

        const existingUser = await User.findById(receiverId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newReview = new Review({
            senderId,
            receiverId,
            text
        });

        await newReview.save();

        existingUser.reviews.push(newReview._id);
        await existingUser.save(); // Save the updated user with the new review

        res.status(201).json({ success: true, message: "Review posted successfully", review: newReview });
    } catch (error) {
        console.error("Error posting review:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

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