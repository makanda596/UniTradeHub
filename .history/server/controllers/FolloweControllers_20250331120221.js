import { Following } from "../models/Following.js"
import { User } from "../models/userModels.js"

export const FollowUser = async (req,res)=>{
    const { followedId } = req.params
    const  followerId  = req.user.id

    try {
        const followedUserId = await User.findById(followedId)
        if (!followedUserId){
            return res.status(400).json({message:"user does not exist"})
        }
        const followingUserId = await User.findById(followerId)
        if (!followingUserId){
           return res.status(400).json({message:"please log in to follow"})
        }

    const newFollower = new Following({
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


// export const followBack = async (req,res)=>{
//     const userId = req.user.id
//     const{ followBackId} = req.params
//     try {
//         const  = await User.findById(followedId)
//         if (!followedUserId) {
//             return res.status(400).json({ message: "user does not exist" })
//         }
//         const followingUserId = await User.findById(followerId)
//         if (!followingUserId) {
//             return res.status(400).json({ message: "please log in to follow" })
//         }

//     } catch (error) {
        
//     }
// }


export const getfollowers = async(req,res)=>{
    try {
        const user = await User.findById({ followedId: req.user.id }).populate("followerId", "username").select('username')
        if(!user){
           return  res.status(400).json({message:"please log in "})
        }

        res.json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
}