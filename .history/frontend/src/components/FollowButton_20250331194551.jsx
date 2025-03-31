import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FollowButton = () => {
    const API_BASE_URL = "http://localhost:5000/follow"; // Change this to your backend URL

    const { followedId } = useParams()
    // const toggleFollow = async () => {
    //     if (isFollowing) {
    //         await handleUnfollow(userId);
    //     } else {
    //         // await handleFollow(userId);
    //     }
    // };
    const handdleFollowfunction = async ()=>{
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${API_BASE_URL}/followUser/${followedId}`, {
                           headers: { Authorization: `Bearer ${token}` },
                       });
                       console.log(response.data)
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
