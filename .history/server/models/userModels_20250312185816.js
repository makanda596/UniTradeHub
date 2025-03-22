import mongoose from "mongoose";
import { Post } from "./postModel.js";
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 } ,
       post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: false}, // Reference to User mode
    gender: { type: String, required: true, enum: ["male", "female"] }, // Ensuring valid gender values
    profilepic: {
        default: "",
        type: String
    },
}); 

export const User = mongoose.model("User", UserSchema);
 