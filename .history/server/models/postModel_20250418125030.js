import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true, 
        enum: ["Electronics", "Fashion & Clothing", "Gas Supply", "Home", "Kitchen", "Furniture", "Beauty&Cosmetics", "Food&beverages", "Salon", "Others"]
    },

    image: {
        type: String 
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
},{timestamps:true});

export const Post = mongoose.model("Post", PostSchema);
