import { Post } from '../models/postModel.js';
import {User} from '../models/userModels.js'
export const createPost = async (req, res) => {
    try {
        const { productName, description } = req.body;
        const userId = req.user._id; // Assume user is authenticated and `req.user` is set

        if (!productName || !description || !image) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const post = new Post({
            productName,
            description,
            // image,
            createdBy: userId,
        });

        await post.save();
        res.status(201).json({ message: "Post created successfully!", post });

    } catch (error) {
        console.error("❌ Post Creation Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("createdBy", "username email");
        res.status(200).json(posts);
    } catch (error) {
        console.error("❌ Fetch Posts Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};
