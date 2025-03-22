import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["Electronics", "Fashion", "Gas Supply", "Home ","Kitchen","furniture","beauty&cosmetics","food &beverages","salon", "Others"]
    },

    // image: { type: String, required: true }, // Store image URL
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    createdAt: { type: Date, default: Date.now },
});

export const Post = mongoose.model("Post", PostSchema);
