import mongoose from 'mongoose'

const SuspendedSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
    }
},{timestamps:true})

export const Suspended = new mongoose.model("Suspended", SuspendedSchema)