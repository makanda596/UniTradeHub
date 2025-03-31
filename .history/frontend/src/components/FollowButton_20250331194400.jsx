import React from "react";
import { FollowStore } from "../utilis/follow";
import axios from "axios";

const FollowButton = ({ userId }) => {
    const { handleFollow} = FollowStore();
    // const toggleFollow = async () => {
    //     if (isFollowing) {
    //         await handleUnfollow(userId);
    //     } else {
    //         // await handleFollow(userId);
    //     }
    // };
    console.log(userId)
    const handdleFollowfunction = async ()=>{
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${API_BASE_URL}/following`, {
                           headers: { Authorization: `Bearer ${token}` },
                       });
                       console.log(response.dat)
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
