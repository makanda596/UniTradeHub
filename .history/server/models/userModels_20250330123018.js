import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    gender: { type: String, required: true, enum: ["male", "female"] },
    profilepic: { type: String, default: "" },

    // 👇 Adding cart field (array of post IDs)
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    reviews:[{type:mongoose.Schema.Types.ObjectId, ref:"Review"}],
    isVerified:{default:false , type:Boolean},
    verificationCode:String,
    verificationCodeExpires:Date,
    resetPasswordToken: String,
resetPasswordExpires:Date
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
