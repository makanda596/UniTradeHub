import React from "react";
import { FollowStore } from "../utilis/follow";

const FollowButton = ({ userId, isFollowing }) => {
    const { handleFollow, handleUnfollow } = FollowStore();
    const toggleFollow = async () => {
        if (isFollowing) {
            await handleUnfollow(userId);
        } else {
            // await handleFollow(userId);
        }
    };
    const handdleFollowfunction =async ()=>{
        try {
            await handleFollow()
        } catch (error) {
            
        }
    }

    return (
        // <button
        //     onClick={toggleFollow}
        //     className={`px-4 py-2 rounded-md ${isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
        //         }`}
        // >
        //     {isFollowing ? "Unfollow" : "Follow"}
        // </button>
        <><button onClick={handdleFollowfunction}>follow</button></>
    );
};

export default FollowButton;
