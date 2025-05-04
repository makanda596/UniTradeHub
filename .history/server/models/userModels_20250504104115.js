import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    phoneNumber: {
        type: String, required: true, unique: true, validate: {
            validator: function (v) {
                return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format
            },
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
    resetPasswordExpires: Date
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
