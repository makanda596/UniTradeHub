import { populate } from "dotenv";
import { Cart } from "../models/Cart.js"
import { Post } from "../models/postModel.js"
import { User } from "../models/userModels.js"

export const addCart = async (req, res) => {
    const {postId } = req.params;
    const userId = req.user.id;

    try {
      
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found - please log in"
            });
        }

        const existingPost = await Post.findById(postId);
        if (!existingPost) {
            return res.status(404).json({
                success: false,
                message: "Post does not exist"
            });
        }

        const existingCartItem = await Cart.findOne({
            postId: postId,
            userId: userId
        });

        if (existingCartItem) {
            return res.status(409).json({
                success: false,
                message: "Post already exists in cart"
            });
        }

        const newCart = new Cart({
            postId,
            userId
        });

        const savedCart = await newCart.save();

        // Update user's cart array
        await User.findByIdAndUpdate(
            userId,
            { $push: { cart: savedCart._id } },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Product added to cart successfully",
            cartItem: savedCart
        });

    } catch (error) {
        // console.error("Add to cart error:", error);
        res.status(500).json(
            error.message
        );
    }
};
 
export const getCart = async (req,res)=>{
    try {
        const cart = await Cart.find({ userId: req.user.id })
        .populate({
            path:"postId",
            select:"productName description image createdBy",
            populate:{
                path:"createdBy",
                select:"username profilepic"
            }
        })
        if(!cart){
            return res.status(400).json({message:"please log in"})
        }
        res.json(cart)
    } catch (error) {
        res.status(400).json(error.message)
    }
} 
 
export const countCart = async(req,res)=>{
    try {
        const count = await Cart.countDocuments({ userId: req.user.id })
        if(!count){ 
        return res.status(400).json({message:"no count"})}
        res.status(200).json(count)
    } catch (error) {
        res.json(error.message)
    }
}

export const removeCart = async (req,res)=>{
    const {postId}=req.params
    const userId = req.user.id
    try {
        const existingPost = await Cart.findOneAndDelete({postId,userId})
        if(!existingPost){
            return res.status(400).json({message:"post does not exist or already deleted"})
        }

        ///I find the userId in the user schema and pull the itme which is the cart.witht the existing id from the cart schema then i set it to true
        await User.findByIdAndUpdate(userId, { $pull: { cart: existingPost._id}}, {new:true})

        await existingPost.save()
        // await Cart.findOneAndDelete(existingPost)
        res.json({ message: "succesfully removed the saved post" });

    } catch (error) {
        res.json(error.message)
    }
}