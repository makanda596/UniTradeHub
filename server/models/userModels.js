import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, maxlength:15},
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        // minlength:10
    },
    password: { type: String, required: true, minlength: 8 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    gender: { type: String, required: true, enum: ["male", "female"] },
    profilepic: { type: String, default: "" },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }], 
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Following" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Following" }],  
    reports:[{type:mongoose.Schema.Types.ObjectId, ref:"Report"}],
    isVerified: { default: false, type: Boolean },
    verificationCode: String,
    verificationCodeExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastLogin :{type:Date},
    limits:{type:Number, default:"0"},
    limitUntil:{type:Date}
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
