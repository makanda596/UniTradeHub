import mongoose from "mongoose"

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 } ,
    limit:{type:Number,default:"0"},
    limitUntil:{type:Date}
},{timestamps:true})


export const Admin = mongoose.model("Admin", AdminSchema);
