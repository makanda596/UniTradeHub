import { Following } from "../models/Following.js"
import { User } from "../models/userModels.js"

export const FollowUser = async (req,res)=>{
    const { followedId } = req.params

    try {
        const followedUserId = await User.findById(followedId)
        if (!followedUserId){
            return res.status(400).json({message:"user does not exist"})
        }
        const followingUserId = await User.findById(req.user.id)
        if (!followingUserId){
            res.status(400).json({message:"please log in to follow"})
        }

    const newFollower = new Following({
        _id: followin,gUserId
        followedUserId,followingUserId
    })
    await newFollower.save()

        //push to the followedUserId
        followedUserId.following.push(newFollower._id)
        await followedUserId.save()


        followingUserId.following.push(newFollower._id)
        await followingUserId.save()
        res.json({ message: "followed the user", newFollower })
    } catch (error) {
        res.json(error.message)
    }
}