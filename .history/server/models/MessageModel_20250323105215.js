import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema ({

    senderId:{
        type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' ,
    },
    message:{
        type:String,
    }
},{timestamps:true})

export const Message = new mongoose.model("Message",MessageSchema )