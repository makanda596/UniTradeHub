import { Post } from '../models/postModel.js';
import {User} from '../models/userModels.js'
import cloudinary from '../utilis/cloudinary.js';


export const createPost = async (req, res) => {
    const { productName, description, category, image } = req.body;
    const { id } = req.params; // Extract user ID from URL

    try {
        if (!productName || !description || !category) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Find the user who is making the post
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        if (image) {
            try {
                console.log("Uploading image to Cloudinary...");
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
                console.log("✅ Cloudinary Upload Successful:", imageUrl);
            } catch (uploadError) {
                console.error("❌ Cloudinary Upload Failed:", uploadError);
            }
        }


        // Create the new post
        const post = new Post({
            productName,
            description,
            category,
            image: imageUrl, // Store the image as a string (path)
            createdBy: existingUser._id, // Associate post with user
        });

        // Save the post
        const savedPost = await post.save();
console.log(image)
        // Update the user's posts array
        existingUser.posts.push(savedPost._id);
        await existingUser.save(); // Ensure the update is saved

        console.log("✅ Post created and user updated:", existingUser);

        res.status(201).json({ message: "Post created successfully!", posts: savedPost });
    } catch (error) {
        console.error("❌ Post Creation Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


export const getpost= async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) return res.status(400).json({ error: "Category is required" });

        const posts = await Post.find({ category });
        res.status(200).json(posts); 
    } catch (error) {
        console.error("Error fetching posts by category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("createdBy", "username phoneNumber profilepic").sort({createdAt:-1});
        res.status(200).json(posts);
    } catch (error) {
        console.error("❌ Fetch Posts Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};
// export const getUserPosts = async (req, res) => {
//     const { id } = req.params; // Get user ID from URL
//     try {
//         // Fetch posts where userId matches the given ID
//         const posts = await Post.find({ _id:id }).populate("createdBy", "email" );

//         if (!posts || posts.length === 0) {
//             return res.status(404).json({ message: "No posts found for this user." });
//         }

//         res.status(200).json({ message: "User posts", posts });
//     } catch (error) {
//         console.error("❌ Fetch Posts Error:", error);
//         res.status(500).json({ error: "Internal server error", message: error.message });
//     }
// };


export const getUserPosts = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch user details and populate their posts
        const user = await User.findById(id).populate({
            path: "posts",
            select: "productName description createdAt"
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User details and posts retrieved successfully",
            user: {
                _id: user._id,
                username: user.username,
                phoneNumber: user.phoneNumber,
                profilepic: user.profilepic,
            },
            posts: user.posts, // Populated posts array
        });
    } catch (error) {
        console.error("❌ Fetch User Posts Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};



export const addToWishlist = async (req, res) => {
    const { userId, postId } = req.body;

    try {
        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } 

        // Find post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if post is already in the wishlist
        if (user.wishlist.includes(postId)) {
            return res.status(400).json({ message: "Post already in wishlist" });
        }

        // Add post to wishlist
        user.wishlist.push(postId);
        await user.save();

        res.status(200).json({ message: "Post added to wishlist", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
