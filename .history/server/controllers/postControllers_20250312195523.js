import { Post } from '../models/postModel.js';
import {User} from '../models/userModels.js'
export const createPost = async (req, res) => {
    const { productName, description } = req.body;
    const {id}= req.params
    try {
        if (!productName || !description ) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const existinguser = await User.findOne({ _id:id }).select("-password");
        if (!existinguser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
       
        const post = new Post({
            productName, 
            description,
            // image,
            createdBy: existinguser._id,
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
        const posts = await Post.find().populate("createdBy", "username phoneNumber profilepic");
        res.status(200).json(posts);
    } catch (error) {
        console.error("❌ Fetch Posts Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};
export const getUserPosts = async (req, res) => {
    const { id } = req.params; // Get user ID from URL
    try {
        // Fetch posts where userId matches the given ID
        const posts = await Post.find({ _id:id }).populate("createdBy", "email" );

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this user." });
        }

        res.status(200).json({ message: "User posts", posts });
    } catch (error) {
        console.error("❌ Fetch Posts Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};
