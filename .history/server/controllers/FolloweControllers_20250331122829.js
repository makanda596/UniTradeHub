import { Following } from "../models/Following.js"
import { User } from "../models/userModels.js"

// export const FollowUser = async (req,res)=>{
//     const { followedId } = req.params
//     const  followerId  = req.user.id

//     try {
//         const followedUserId = await User.findById(followedId)
//         if (!followedUserId){
//             return res.status(400).json({message:"user does not exist"})
//         }
//         const followingUserId = await User.findById(followerId)
//         if (!followingUserId){
//            return res.status(400).json({message:"please log in to follow"})
//         }

//     const newFollower = new Following({
//         followedId,
//         followerId
//     })
//     await newFollower.save()

//         //push to the followedUserId
//         followedUserId.following.push(newFollower._id)
//         await followedUserId.save()

// //push the follower to the data of the one making the follow
//         followingUserId.following.push(newFollower._id)
//         await followingUserId.save()
//         res.json({ message: "followed the user", newFollower })
//     } catch (error) {
//         res.json(error.message)
//     }
// }


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

export const FollowUser = async (req, res) => {
    const { followedId } = req.params;
    const followerId = req.user.id;

    try {
        const followedUser = await User.findById(followedId);
        if (!followedUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const followingUser = await User.findById(followerId);
        if (!followingUser) {
            return res.status(400).json({ message: "Please log in to follow" });
        }

        // Check if already following
        const existingFollow = await Following.findOne({ followerId, followedId });
        if (existingFollow) {
            return res.status(400).json({ message: "You are already following this user" });
        }

        // Create new following relationship
        const newFollower = new Following({
            followedId,
            followerId
        });
        await newFollower.save();

        // Add to following list of follower
        followingUser.following.push(newFollower._id);
        await followingUser.save();

        // Add to followers list of the followed user
        followedUser.followers.push(newFollower._id);
        await followedUser.save();

        res.json({ message: "Followed the user", newFollower });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getFollowers = async (req, res) => {
    const userId = req.user.id;

    try {
        // Populate followers with user details
        const user = await User.findById(userId)
            .populate({
                path: "followers",
                populate: { path: "followerId", select: "username email profilepic" } // Populate follower details
            })
            .select("username email profilepic followers");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.json({ followers: user.followers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFollowing = async (req, res) => {
    const userId = req.user.id;

    try {
        // Populate following with user details
        const user = await User.findById(userId)
            .populate({
                path: "following",
                populate: { path: "followedId", select: "username email profilepic" } // Populate followed user details
            })
            .select("username email profilepic following");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.json({ following: user.following });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// export const getfollowers = async(req,res)=>{
//     const followedId = req.user.id
//     try {
//         const user = await User.findById(followedId).populate("following", "username").select('username')
//         if(!user){
//            return  res.status(400).json({message:"please log in "})
//         }

//         res.json(user)
//     } catch (error) {
//         res.status(400).json(error.message)
//     }
// }