import { Following } from "../models/Following.js"
import { User } from "../models/userModels.js"

//FOLOW USER SECTION
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

        const existingFollow = await Following.findOne({ followerId, followedId });
        if (existingFollow) {
            return res.status(400).json({ message: "You are already following this user" });
        }

        const newFollower = new Following({
            followedId,
            followerId
        });
        await newFollower.save();

        followingUser.following.push(newFollower._id);
        await followingUser.save();

        followedUser.followers.push(newFollower._id);
        await followedUser.save();

        res.json({ message: "Followed the user", newFollower });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//GET FOLLOWERS OF A SPECIFIC USER
export const getFollowers = async (req, res) => {
    const {userId} = req.params;

    try {
        const user = await User.findById({_id:userId})
            .populate({
                path: "followers",
                populate: { path: "followerId", select: "username  profilepic bio" } 
            })
            .select("username email profilepic following bio");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.json({ followers: user.followers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//GETTING FOLLOWING
export const getFollowing = async (req, res) => {
    const {userId} = req.params;

    try {
        // Populate following with user details
        const user = await User.findById({_id:userId})
            .populate({
                path: "following",
                populate: { path: "followedId", select: "username email profilepic bio" }
            })
            .select("username email profilepic following bio");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.json({ following: user.following });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const usergetFollowers = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId)
            .populate({
                path: "followers",
                populate: { path: "followerId", select: "username  profilepic following" } 
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

export const usergetFollowing = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId)
            .populate({
                path: "following",
                populate: { path: "followedId", select: "username email profilepic" } 
            })
            .select("username email profilepic following");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log(user.following)
        res.json({ following: user.following });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UnfollowUser = async (req, res) => {
    const { followedId } = req.params;
    const followerId = req.user.id;

    try {
        const followRecord = await Following.findOneAndDelete({ followerId, followedId });
        if (!followRecord) {
            return res.status(400).json({ message: "You are not following this user" });
        }

        await User.findByIdAndUpdate(followerId, { $pull: { following: followRecord._id } });
        await User.findByIdAndUpdate(followedId, { $pull: { following: followRecord._id } });

        res.json({ message: "Unfollowed the user" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const countFollowers = async (req, res) => {
    const {userId} = req.params;

    try {
        const count = await Following.countDocuments({ followedId: userId });

        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const countFollowing = async (req, res) => {
    const {userId} = req.params;

    try {
        const count = await Following.countDocuments({ followerId: userId });

        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const UsercountFollowers = async (req, res) => {
    const userId = req.user.id;

    try {
        const count = await Following.countDocuments({ followedId: userId });

        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const UsercountFollowing = async (req, res) => {
    const userId = req.user.id;

    try {
        const count = await Following.countDocuments({ followerId: userId });

        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};