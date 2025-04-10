import React from "react";
import { FiUserPlus, FiUsers, FiAlertCircle, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const UserFollowingPopUp = ({ userfollowing, error }) => {
    const { handleUnfollow } = FollowStore();

    const handleUnfollowUser = async (followedUserId) => {
        try {
            await handleUnfollow(followedUserId);
        } catch (error) {
            console.error("Unfollow failed:", error);
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <FiUsers className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                        Following ({userfollowing?.length || 0})
                    </h2>
                </div>
            </div>

            {/* Error display remains same */}

            <div className="max-h-96 overflow-y-auto">
                {userfollowing?.length > 0 ? (
                    userfollowing.map((user) => (
                        <div
                            key={user._id}
                            className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                        >
                            <Link
                                to={`/profile/${user.followedId._id}`}
                                className="flex items-center gap-4 flex-1"
                            >
                                {/* Avatar and user info */}
                            </Link>

                            <button
                                onClick={() => handleUnfollowUser(user.followedId._id)}
                                className="ml-4 px-3 py-1 text-sm text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                            >
                                Unfollow
                            </button>
                        </div>
                    ))
                ) : (
                    /* Empty state remains same */(<>no user</>)
                )}
            </div>
        </div>
    );
};