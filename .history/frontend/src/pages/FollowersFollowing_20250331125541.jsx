import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/follow"; // Change this to your backend URL

const FollowersFollowing = () => {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFollowers();
        fetchFollowing();
    }, []);

    const fetchFollowers = async () => {
        try {
            const token = localStorage.getItem("token")
            if(!token){
                return console.log("please kog in")
            }
            const res = await axios.get(`${API_BASE_URL}/getfollowers`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFollowers(res.data.followers);
        } catch (error) {
            console.error("Error fetching followers", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFollowing = async () => {
        try {
            const token = localStorage.getItem("token")

            const res = await axios.get(`${API_BASE_URL}/following`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFollowing(res.data.following);
        } catch (error) {
            console.error("Error fetching following", error);
        }
    };

    const handleFollow = async (userId) => {
        try {
            const token = localStorage.getItem("token")
            await axios.post(`${API_BASE_URL}/follow/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchFollowing();
        } catch (error) {
            console.error("Error following user", error);
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
                                <div key={user._id} className="flex items-center gap-3 p-2 border rounded-md mb-2">
                                    <img src={user.profilepic || "https://via.placeholder.com/50"} className="w-10 h-10 rounded-full" alt="Profile" />
                                    <p>{user.username ||"Dgbfvx"}</p>
                                </div>
                            ))
                        ) : <p>No followers yet</p>}
                    </div>

                    {/* Following Section */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Following</h3>
                        {following.length > 0 ? (
                            following.map(user => (
                                <div key={user._id} className="flex items-center justify-between p-2 border rounded-md mb-2">
                                    <div className="flex items-center gap-3">
                                        <img src={user.profilepic || "https://via.placeholder.com/50"} className="w-10 h-10 rounded-full" alt="Profile" />
                                        <p>{user.username}</p>
                                    </div>
                                    <button
                                        onClick={() => handleFollow(user._id)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                                    >Follow</button>
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
