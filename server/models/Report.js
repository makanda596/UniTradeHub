import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
    reportedId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
},{timestamps:true})

export const Report = mongoose.model("Report", ReportSchema)