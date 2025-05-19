import mongoose from 'mongoose'

const FlashsaleSchema = new mongoose.Schema({
    image:{type:String,required:true},
    description:{type:String,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    expiresAt:{type:Date}
},{timestamps:true})

export const Flashsale = new mongoose.model("Flashsale", FlashsaleSchema)