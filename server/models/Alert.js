import mongoose from 'mongoose'

const AlertSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["post","user","report"]
    }
},{timestamps:true})

export const Alert = new mongoose.model("Alert", AlertSchema)