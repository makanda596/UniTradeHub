import mongoose from 'mongoose'

const ReviewsSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text:{
        type:String,
    }
},{timestamps:true})

export const Review = new mongoose.model("Review", ReviewsSchema)