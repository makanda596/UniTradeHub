import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User model
        required: true,
    },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
