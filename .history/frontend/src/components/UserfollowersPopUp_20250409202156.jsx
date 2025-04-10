import React from "react";
import { FiUserPlus, FiUsers, FiAlertCircle, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserFollowersPopUp = ({ userfollowers, loading, error }) => {
    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <FiUsers className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                        Following ({userfollowers?.length || 0})
                    </h2>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 m-4 text-red-600 bg-red-50 rounded-lg flex items-center gap-3">
                    <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            <div className="max-h-96 overflow-y-auto">
                {userfollowers?.length > 0 ? (
                    userfollowers.map((user, index) => (
                        <div
                            key={user._id || index}
                            className="p-4 hover:bg-gray-50 transition-colors"
                        >
                            <Link
                                to={`/profile/${user.followerId._id}`}
                                className="flex items-center gap-4"
                            >
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    {user.followerId.profilepic ? (
                                        <img
                                            src={user.followerId.profilepic}
                                            alt={user.followerId.username}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-purple-100"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                            <FiUser className="text-purple-600" />
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900 truncate">
                                        {user.followerId.username || "Anonymous User"}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">
                                        {user.followerId.bio || "No bio available"}
                                    </p>
                                </div>

                                {/* Status */}
                                <FollowButton/>
                            </Link>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="p-6 text-center">
                        <div className="mx-auto mb-4 text-gray-400">
                            <FiUserPlus className="w-12 h-12 inline-block" />
                        </div>
                        <p className="text-gray-500 mb-4">Not followers anyone yet</p>
                        <Link
                            to="/explore"
                            className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                            Discover users →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserFollowersPopUp;