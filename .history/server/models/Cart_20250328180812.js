import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    
   carts:[{}]
},{timestamps:true})

export const Cart = new mongoose.model("Cart", CartSchema)