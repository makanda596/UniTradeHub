import mongoose from 'mongoose'

const ScamSchema = new mongoose.Schema({
     participants:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
    
},{timestamps:true})

export const Scam = mongoose.model("Scam", ScamSchema)