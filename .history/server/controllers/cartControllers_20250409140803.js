import { Cart } from "../models/Cart.js"
import { Post } from "../models/postModel.js"
import { User } from "../models/userModels.js"

export const addCart = async (req,res)=>{
    const { _id:postId } = req.params
    const userId = req.user.id
    
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.json({message:"please log in"})
        }
        const existingPostId = await Post.findOne(postId)
        if (!existingPostId){
            return res.json({message:"this post does not exist"})
        }

        const newCart = new Cart({
            postId,userId
        })

        await newCart.save()
      user.cart.push(newCart._id)

        await user.save()
        res.json({message:"succesfully added the product to cart",newCart})
    } catch (error) {
        res.json(error.message)
    }
}