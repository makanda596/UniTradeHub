import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

export const createPost = async (req, res) => {
    try {
        const { productName, description, image } = req.body;
        const userId = req.user._id; // Assume user is authenticated and `req.user` is set

        if (!productName || !description || !image) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const post = new Post({
            productName,
            description,
            image,
            createdBy: userId,
        });

        await post.save();
        res.status(201).json({ message: "Post created successfully!", post });

    } catch (error) {
        console.error("❌ Post Creation Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};
