import mongoose from "mongoose";
import { Post } from "../models/postModel.js";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Wishlist array
    gender: { type: String, required: true, enum: ["male", "female"] },
    profilepic: { type: String, default: "" },
});

export const User = mongoose.model("User", UserSchema);
