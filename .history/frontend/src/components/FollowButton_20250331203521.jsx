import React, { useState, useEffect } from "react";
import axios from "axios";
import { FollowStore } from "../utilis/follow";

const FollowButton = ({ userId }) => {
    const API_BASE_URL = "http://localhost:5000/follow";
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { handleUnfollow,following } = FollowStore();


    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${API_BASE_URL}/checkFollowStatus/${userId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setIsFollowing(response.data.isFollowing);
            } catch (error) {
                console.error("Error checking follow status:", error.response?.data || error.message);
            } finally {
                setIsLoading(false);
            }
        };

        checkFollowStatus();
    }, [userId]);

    const handleFollowAction = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("User is not authenticated");
                return;
            }

            if (isFollowing) {
                await axios.post(
                    `${API_BASE_URL}/unfollowUser/${userId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    `${API_BASE_URL}/followUser/${userId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Error performing follow action:", error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    
    if (isLoading) {
        return (
            <button className="bg-gray-300 text-white px-4 py-2 rounded-md cursor-not-allowed">
                Loading...
            </button>
        );
    }

    return (
        <button
            onClick={isFollowing ? handleFollowAction : handleUnfollow(following.user.followedId._id)}
            className={`px-4 py-2 rounded-md text-white ${isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                } transition-colors`}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;