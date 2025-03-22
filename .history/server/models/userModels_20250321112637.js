import mongoose from "mongoose";
import {Post} from '../models/postModel.js'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: false ,default:""},
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 } ,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], 
    gender: { type: String, required: true, enum: ["male", "female"] }, // Ensuring valid gender values
    profilepic: {
        default: "",
        type: String
    },
});

export const User = mongoose.model("User", UserSchema);
 