import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import market from "../assets/market.avif";
import moment from "moment";
import Swal from "sweetalert2";

const Myposts = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Unauthorized: Please log in.");
                    return;
                }

                const response = await axios.get(`http://localhost:5000/auth/userposts/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data.user);
                setPosts(response.data.posts || []);
            } catch (error) {
                console.error("Error fetching user posts:", error);
                setError("Failed to fetch user posts. Try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleDelete = async (postId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:5000/auth/delete/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
                Swal.fire("Deleted!", "Your post has been removed.", "success");
            } catch (error) {
                console.error("Error deleting post:", error);
                Swal.fire("Error", "Failed to delete the post.", "error");
            }
        }
    };

    if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

    return (
        <div className="flex flex-col md:flex-row md:p-10 bg-gray-50 gap-6">
            {/* Profile Section */}
            <div className="bg-white w-full md:w-1/4 md:sticky md:top-10 h-fit rounded-lg shadow-lg">
                <div className="relative h-32 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${market})` }}>
                    <img
                        src={user?.profilepic || "/default-profile.png"}
                        alt="Profile"
                        className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md"
                    />
                </div>
                <div className="text-center bg-white p-6 rounded-b-lg">
                    <h2 className="text-xl font-bold">{user?.username || "User Name"}</h2>
                    <p className="text-gray-600">{user?.email || "No email available"}</p>
                    <p className="text-gray-500 text-sm">{user?.bio || "No bio available"}</p>
                </div>
            </div>

            {/* Posts Section */}
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full md:w-2/3">
                <h3 className="text-lg font-semibold border-b pb-2">All Posts Activity</h3>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="p-4 rounded-lg shadow-md bg-gray-100 hover:shadow-lg transition">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={user?.profilepic || "/default-profile.png"}
                                            alt="User"
                                            className="w-10 h-10 rounded-full shadow-md"
                                        />
                                        <div className="ml-3">
                                            <h4 className="text-gray-800 font-medium">{user?.username}</h4>
                                            <p className="text-gray-500 text-xs">{user?.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <p className="mt-3 text-gray-700 font-semibold">{post.productName}</p>
                                <p className="text-gray-600">{post.description}</p>
                                <p className="text-xs text-gray-500">{moment(post.createdAt).fromNow()}</p>
                                {post.image ? (
                                    <img src={post.image} alt="Post" className="mt-3 rounded-lg shadow-md" />
                                ) : (
                                    <img src={market} alt="Post Default" className="mt-3 rounded-lg shadow-md" />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-4 text-center">No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Myposts;
