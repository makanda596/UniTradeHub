import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema ({

    senderId:{
        type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' ,
        required:True
    },
    message:{
        type:String,
        required:True,
    }
},{timestamps:true})

export const Message = new mongoose.model("Message",MessageSchema )