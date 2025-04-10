import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    
   postId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
   }]
},{timestamps:true})

export const Cart = new mongoose.model("Cart", CartSchema)