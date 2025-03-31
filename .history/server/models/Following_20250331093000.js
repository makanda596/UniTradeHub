import mongoose from "mongoose"

const FollowingSchema = new mongoose.Schema({
    followerId:{type:String, ref:"User"},
    followedId: { type: String, ref: "User" },
},{timestamps:true})

export const Following = new mongoose.Model("Folliwing", FollowingSchema)