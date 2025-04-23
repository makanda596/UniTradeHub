import { Post } from '../models/postModel.js';
import {User} from '../models/userModels.js'
import cloudinary from "cloudinary";
import dotenv from 'dotenv'

dotenv.config();
cloudinary.v2.config({
    cloud_name: "db5pgr14l",
    api_key: "419672131612681",
    api_secret: "X6bdb7zw9Gae9IvWahEyzT9nB1o",
});


 export const createPost = async (req, res) => {
    const { productName, description, category, image } = req.body;

    try {
        if (!productName || !description || !category) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingUser = await User.findById(req.user.id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!image) {
                    return res.status(400).json({ error: "No image provided." });
                }

                const uploadResponse = await cloudinary.v2.uploader.upload(image);
        const post = new Post({
            productName,
            description,
            category,
             image: uploadResponse.secure_url ,
            createdBy: existingUser._id,
        });

        const savedPost = await post.save();
        existingUser.posts.push(savedPost._id);
        await existingUser.save();

        res.status(201).json({ 
            message: "Post created successfully!", 
            post: savedPost 
        });
    } catch (error) {
        console.error("❌ Post Creation Error:", error);
        res.status(500).json({ 
            error: "Internal server error", 
            message: error.message 
        });
    } 
};
//GETING OF ALL POSTS
export const getpost= async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) return res.status(400).json({ error: "Category is required" })
 
        const posts = await Post.find({ category }).populate("createdBy", "username phoneNumber profilepic").sort({ createdAt: -1 });
        res.status(200).json(posts); 
    } catch (error) {
        console.error("Error fetching posts by category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getAllPosts = async (req, res) => {

    // $ne it means not equal to will retrive all the posts which are not equal to the user id
    try {
        const posts = await Post.find({createdBy : {$ne:req.user.id}}).populate("createdBy", "username phoneNumber profilepic").sort({createdAt:-1});
        res.status(200).json(posts);
    } catch (error) {
        console.error("❌ Fetch Posts Error:", error); 
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};
export const guestAllPosts = async (req, res) => {

    // $ne it means not equal to will retrive all the posts which are not equal to the user id
    try {
        const posts = await Post.find({}).populate("createdBy", "username phoneNumber profilepic").sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error("❌ Fetch Posts Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


//GETTING OF A USER POSTS

export const getUserPosts = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).populate({
            path: "posts",
            select: "productName  description createdAt"
        }).sort({createdAt:-1});

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
            posts: user.posts, 
        });
    } catch (error) {
        console.error("❌ Fetch User Posts Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};
 

//TO DO DELETE THIS IF TE OTHER CART ROUTE IS NOT FUNCTIONING
// export const addToWishlist = async (req, res) => {
//     const { userId, postId } = req.body;

//     try {
//         // Find user
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         } 

//         // Find post
//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ message: "Post not found" });
//         }

//         // Check if post is already in the wishlist
//         if (user.wishlist.includes(postId)) {
//             return res.status(400).json({ message: "Post already in wishlist" });
//         }

//         // Add post to wishlist
//         user.wishlist.push(postId);
//         await user.save();

//         res.status(200).json({ message: "Post added to wishlist", user });
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

export const getRelatedPosts = async (req, res) => {
    const { category, postId } = req.params;

    try {
        const related = await Post.find({
            category,
            _id: { $ne: postId } 
        }).populate("createdBy" , "profilepic username");

        res.status(200).json(related);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch related posts", error: error.message });
    }
};

export const getOnePost = async (req,res) =>{
    const {postId}= req.params

    try {

        const post = await Post.findOne({ _id: postId }).populate("createdBy", "username phoneNumber profilepic location")
        if(!postId){
            res.status(400).json({message:"no post with this id found"})
        }

       res.json(post)
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
