import React from "react";
import { FollowStore } from "../utilis/follow";

const FollowButton = ({ userId }) => {
    const { handleFollow, userId } = FollowStore();
    // const toggleFollow = async () => {
    //     if (isFollowing) {
    //         await handleUnfollow(userId);
    //     } else {
    //         // await handleFollow(userId);
    //     }
    // };
    console.log(userId)
    const handdleFollowfunction =async ()=>{
        try {
            await handleFollow(userId)
        } catch (error) {
            console.error(error.message)
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
