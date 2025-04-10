import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true, 
        enum: ["Electronics", "Fashion & Clothing", "Gas Supply", "Home", "Kitchen", "Furniture", "beauty&cosmetics", "food&beverages", "Salon", "Others"]
    },

    image: {
        type: String 
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    createdAt: { type: Date, default: Date.now },
},{timestamps:true});

export const Post = mongoose.model("Post", PostSchema);
