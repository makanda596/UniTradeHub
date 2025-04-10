import React, { useState } from "react";
import { FiUserPlus, FiUsers, FiAlertCircle, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FollowStore } from "../utilis/follow";

const UserFollowersPopUp = ({ error }) => {
    const { handleUserfollow, followers } = FollowStore();
    const [message, setMessage] = useState("");

    const handleFollowUser = async (followerUserId) => {
        try {
            // Optimistic UI update
            const previousFollowers = [...followers];
            FollowStore.setState({ 
                followers: followers.filter(u => u.followerId._id !== followerUserId)
            });

            await handleUserfollow(followerUserId);
            setMessage("Successfully unfollowed user");
            
            // Clear message after 2 seconds
            setTimeout(() => setMessage(""), 2000);
        } catch (error) {
            // Revert if API call fails
            FollowStore.setState({ followers: previousFollowers });
            console.error("Unfollow failed:", error);
            setMessage("Failed to unfollow user");
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <FiUsers className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                        Followers ({followers?.length || 0})
                    </h2>
                </div>
            </div>

            {message && (
                <div className="p-4 m-4 text-green-600 bg-green-50 rounded-lg">
                    {message}
                </div>
            )}

            {/* ... rest of the component remains the same but use 'followers' from store ... */}
        </div>
    );
};

export default UserFollowersPopUp;