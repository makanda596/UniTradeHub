import { User } from "../models/userModels.js"

export const FollowUser = async (req,res)=>{
    const followerId = req.user.id
    const { followedId } = req.params

    try {
        const followedUser = await User.findOne({ followedId })
        if (!followedUser){
            return res.status(400).json({message:"user does not exist"})
        }
    } catch (error) {
        res.json(error.message)
    }
}