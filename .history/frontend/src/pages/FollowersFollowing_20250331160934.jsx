import { useEffect, useState } from "react";
import axios from "axios";
import { FollowStore } from "../utilis/follow";

const API_BASE_URL = "http://localhost:5000/follow"; // Change this to your backend URL

const FollowersFollowing = () => {
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchFollowers, followers } = FollowStore()

    useEffect(() => {
        fetchAllFollowers();
        // fetchFollowing();
    }, []);

    const fetchAllFollowers = async () => {
        try {
            await fetchFollowers();
        } catch (error) {
            console.error("Error fetching followers", error);
        }
    };

 

    const handleFollow = async () => {
        try {
            const token = localStorage.getItem("token")
            await axios.post(`${API_BASE_URL}/following`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchFollowing();
        } catch (error) {
            console.error("Error following user", error);
        } 
    };

    const handleUnfollow = async (followedId) => {
        try {
            const token = localStorage.getItem("token")
            await axios.delete(`${API_BASE_URL}/unfollow/${followedId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Refresh the following list after unfollowing
            fetchFollowing();
        } catch (error) {
            console.error("Error unfollowing user", error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Followers & Following</h2>
            {loading ? <p>Loading...</p> : (
                <div className="grid grid-cols-2 gap-6">
                    {/* Followers Section */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Followers</h3>
                        {followers.length > 0 ? (
                            followers.map(user => (
                                <div key={user._id} className="flex items-center justify-between gap-3 p-2 border rounded-md mb-2">
                                    <div className="flex items-center gap-3">
                                        <img src={user?.followerId?.profilepic || "https://via.placeholder.com/50"}
                                            className="w-10 h-10 rounded-full"
                                            alt="Profile" />
                                        <p>{user?.followerId?.username || "Unknown User"}</p>
                                    </div>
                                </div>
                            ))
                        ) : <p>No followers yet</p>}
                    </div>

                    {/* Following Section */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Following</h3>
                        {following.length > 0 ? (
                            following.map(user => (
                                <div key={user._id} className="flex items-center justify-between gap-3 p-2 border rounded-md mb-2">
                                    <div className="flex items-center gap-3">
                                        <img src={user?.followedId?.profilepic || "https://via.placeholder.com/50"}
                                            className="w-10 h-10 rounded-full"
                                            alt="Profile" />
                                        <div>
                                            <p>{user?.followedId?.username || "Unknown User"}</p>
                                            <p className="text-sm text-gray-500">
                                                Status: {user.status ? "Accepted" : "Pending"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleUnfollow(user.followedId._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Unfollow
                                    </button>
                                </div>
                            ))
                        ) : <p>Not following anyone yet</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FollowersFollowing;