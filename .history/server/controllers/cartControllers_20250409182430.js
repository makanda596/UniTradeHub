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

export const getcart = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            return res.json({message:"please log in"})
        }
        res.json(user)
    } catch (error) {
        res.status(400).json(error)
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