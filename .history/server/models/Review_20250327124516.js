import mongoose from 'mongoose'

const ReviewsSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:True,
        ref:"User"
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text:{
        type:String,
        required:True
    }
})