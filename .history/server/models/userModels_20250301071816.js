import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 } ,
    avatar: {
        type: String,
        default: ""
    }, gender: { type: String, required: true, enum: ["male", "female"] }, // Ensuring valid gender values
});

export const User = mongoose.model("User", UserSchema);
