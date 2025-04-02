import React, { useState, useEffect } from "react";
import axios from "axios";
import { FollowStore } from "../utilis/follow";

const FollowButton = ({ userId }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { handleUnfollow, handleFollow, following, fetchFollowing } = FollowStore();

    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get(
                    `https://unitradehubback.onrender.com/follow/checkFollowStatus/${userId}`,
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
    }, [userId, following]); // Added following to dependencies

    const handleFollowAction = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("User is not authenticated");
                return;
            }

            if (isFollowing) {
                // Using Zustand's handleUnfollow
                await handleUnfollow(userId);
            } else {
                // Using Zustand's handleFollow
                await handleFollow(userId);
            }

            // Update local state
            setIsFollowing(!isFollowing);
            // Refresh following list
            await fetchFollowing();
        } catch (error) {
            console.error("Error performing follow action:", error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <button className=" text-green-400 px-4 py-2 rounded-md cursor-not-allowed">
                Loading...
            </button>
        );
    }

    return (
        <button
            onClick={handleFollowAction}
            className={`px-1 py-2 font-bold ${isFollowing ? "text-red-500 " : "text-blue-500"
                } transition-colors`}
            disabled={isLoading}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;