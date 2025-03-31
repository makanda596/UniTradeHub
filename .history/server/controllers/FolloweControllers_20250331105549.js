import { Following } from "../models/Following.js"
import { User } from "../models/userModels.js"

export const FollowUser = async (req,res)=>{
    const { followedId } = req.params
    const { followerId } = req.user.id

    try {
        const followedUserId = await User.findById(followedId)
        if (!followedUserId){
            return res.status(400).json({message:"user does not exist"})
        }
        const followingUserId = await User.findById(followerId)
        if (!followingUserId){
            res.status(400).json({message:"please log in to follow"})
        }

    const newFollower = new Following({
        _id: followedUserId,
        followedId,
        followerId
    })
    await newFollower.save()

        //push to the followedUserId
        followedUserId.following.push(newFollower._id)
        await followedUserId.save()

//push the follower to the data of the one making the follow
        followingUserId.following.push(newFollower._id)
        await followingUserId.save()
        res.json({ message: "followed the user", newFollower })
    } catch (error) {
        res.json(error.message)
    }
}