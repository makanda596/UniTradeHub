import { useEffect, useState } from "react";
import { FollowStore } from "../utilis/follow";

const FollowersFollowingPopup = ({ activeTab}) => {
    const { fetchFollowers, fetchFollowing, followers, following, handleUnfollow } = FollowStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (activeTab === 'followers') {
                await fetchFollowers();
            } else {
                await fetchFollowing();
            }
            setLoading(false);
        };
        fetchData();
    }, [activeTab]);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center py-8">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {activeTab === 'followers' ? (
                        followers.length > 0 ? (
                            followers.map((user) => (
                                <div key={user._id} className="flex items-center justify-between gap-3 p-3 border rounded-md">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user?.followerId?.profilepic || "https://via.placeholder.com/50"}
                                            className="w-10 h-10 rounded-full"
                                            alt="Profile"
                                        />
                                        <p className="font-medium">{user?.followerId?.username || "Unknown User"}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center py-4 text-gray-500">No followers yet</p>
                        )
                    ) : (
                        following.length > 0 ? (
                            following.map((user) => (
                                <div key={user._id} className="flex items-center justify-between gap-3 p-3 border rounded-md">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user?.followedId?.profilepic || "https://via.placeholder.com/50"}
                                            className="w-10 h-10 rounded-full"
                                            alt="Profile"
                                        />
                                        <div>
                                            <p className="font-medium">{user?.followedId?.username || "Unknown User"}</p>
                                            <p className="text-sm text-gray-500">
                                                Status: {user.status ? "Accepted" : "Pending"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleUnfollow(user.followedId._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                                    >
                                        Unfollow
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center py-4 text-gray-500">Not following anyone yet</p>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default FollowersFollowingPopup;