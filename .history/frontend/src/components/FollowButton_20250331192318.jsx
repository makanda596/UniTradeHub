import React from "react";
import { FollowStore } from "../utilis/follow";

const FollowButton = ({ userId, isFollowing }) => {
    const { handleFollow, handleUnfollow } = FollowStore();
console.log(userId)
    const toggleFollow = async () => {
        if (isFollowing) {
            await handleUnfollow(userId);
        } else {
            await handleFollow(userId);
        }
    };

    return (
        <button
            onClick={toggleFollow}
            className={`px-4 py-2 rounded-md ${isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                }`}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;
