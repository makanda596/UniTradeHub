import mongoose from "mongoose"

const FollowingSchema = new mongoose.Schema({
    followerId:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"User"
        },
    followedId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status:{default:false, type:Boolean}
},{timestamps:true})

export const Following = new mongoose.model("Following", FollowingSchema)