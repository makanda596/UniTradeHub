import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import market from "../assets/market.avif";

const Myposts = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]); // Corrected state for posts
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Function to format time ago
    const timeAgo = (date) => moment(date).fromNow();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/auth/userposts/${userId}`);
                setUser(response.data.user);
                setPosts(response.data.user.posts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    // Handle post deletion
    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/auth/delete/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update state to remove the deleted post
            setPosts(posts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="flex flex-col md:flex-row md:p-10 bg-gray-50 gap-6">
            {/* Profile Section */}
            <div className="bg-white w-full md:w-1/4 md:sticky md:top-10 h-fit p-6 rounded-xl shadow-lg">
                <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${market})` }}>
                    <img
                        src={user?.profilepic || "/default-profile.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto mt-6"
                    />
                </div>
                <div className="flex flex-col items-center p-4">
                    <h2 className="text-xl font-bold mt-3">{user?.username || "User Name"}</h2>
                    <p className="text-gray-600">{user?.email || "No email available"}</p>
                    <p className="text-gray-500 mt-1">
                        Followers: <strong>{user?.followers || 0}</strong>
                    </p>
                    <div className="mt-4 flex space-x-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition">
                            Message
                        </button>
                        <button className="border border-gray-400 px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
                            Following
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="bg-white p-6 md:p-14 rounded-xl shadow-lg w-full md:w-2/3">
                <h3 className="text-lg font-semibold border-b pb-2">All Posts Activity</h3>
                <div className="mt-6 px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="p-4 rounded-lg shadow-md bg-gray-50 relative">
                                <div className="flex items-center">
                                    <img
                                        src={user?.profilepic || "/default-profile.png"}
                                        alt="User"
                                        className="w-10 h-10 rounded-full shadow-md"
                                    />
                                    <div className="ml-3">
                                        <h4 className="text-gray-800 font-medium">{post?.createdBy?.username}</h4>
                                        <p className="text-gray-500 text-xs">{post?.createdBy?.email}</p>
                                        <p className="text-gray-400 text-xs">{timeAgo(post.createdAt)}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-gray-700">{post.description}</p>
                                {post.image && <img src={post.image} alt="Post" className="mt-3 rounded-lg shadow-md" />}

                                {/* Delete Button (Only Visible to Post Owner) */}
                                {user?._id === post?.createdBy?._id && (
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-4">No posts available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Myposts;
