import { Cart } from "../models/Cart.js"
import { Post } from "../models/postModel.js"
import { User } from "../models/userModels.js"

export const addCart = async (req, res) => {
    const { _id: postId } = req.params;
    const userId = req.user.id;

    try {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID format"
            });
        }

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

        // Check if item already in cart using findOne
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
        console.error("Add to cart error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};