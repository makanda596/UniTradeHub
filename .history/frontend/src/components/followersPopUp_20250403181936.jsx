import React from "react";
import { FiUserPlus, FiUsers } from "react-icons/fi";

const FollowersPopUp = ({ followers, loading, error }) => {
    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <FiUsers className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Followers</h2>
            </div>

            {error && (
                <div className="p-4 mb-4 text-red-600 bg-red-50 rounded-lg flex items-center gap-2">
                    <FiAlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

            {loading ? (
                <div className="space-y-4 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    {followers.length > 0 ? (
                        followers.map((user) => (
                            <div
                                key={user._id}
                                className="group flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
                            >
                                <Link to ={`/Profile/${user?._id}`}>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user?.followerId?.profilepic || "https://via.placeholder.com/50"}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-300"
                                        alt={user?.followerId?.username}
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {user?.followerId?.username || "Unknown User"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {user?.followerId?.bio || "No bio available"}
                                        </p>
                                    </div>
                                    </div></Link>
                              
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <div className="mx-auto mb-4 text-gray-400">
                                <FiUsers className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                No followers yet
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Start interacting with others to get followers!
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FollowersPopUp;