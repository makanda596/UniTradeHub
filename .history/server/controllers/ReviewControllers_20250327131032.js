import { Review } from "../models/Review.js"


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