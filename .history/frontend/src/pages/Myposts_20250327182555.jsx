import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import market from "../assets/market.avif";
import moment from "moment";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

const Myposts = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);

    const timeAgo = (date) => moment(date).fromNow();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/auth/userposts/${userId}`
                );
                setUser(response.data);
                setPosts(response.data.posts || []); // Ensure posts state updates
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleDelete = async (postId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
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
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Remove deleted post from state
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

                Swal.fire("Deleted!", "Your post has been deleted.", "success");
            } catch (error) {
                console.error("Error deleting post:", error);
                Swal.fire("Error", "Failed to delete the post.", "error");
            }
        }
    };

    if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

    return (
        <>
        <Navbar/>
        <div className="flex flex-col md:flex-row md:p-10 bg-gray-50 gap-6">
            {/* Profile Section */}
            <div className="bg-white w-full md:w-1/4 md:sticky md:top-10 h-fit">
                <div
                    className="bg-white h-30 p-6 rounded-xl shadow-lg relative bg-cover bg-center"
                    style={{ backgroundImage: `url(${market})` }}
                >
                    <img
                        src={user?.profilepic || "/default-profile.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                </div>
                <div className="flex flex-col items-center bg-white/70 p-4 rounded-xl">
                    <h2 className="text-xl font-bold mt-3">{user?.username || "User Name"}</h2>
                    <p className="text-gray-600 text-center">{user?.email || "No email available"}</p>
                    <p className="text-gray-600 text-center">{user?.bio || "No bio available"}</p>
                   
                  
                </div>
            </div>

            {/* Posts Section */}
            <div className="bg-white p-1 md:p-14 rounded-xl shadow-lg w-full md:w-2/3">
                <h3 className="text-lg font-semibold border-b pb-2">All Posts Activity</h3>
                <div className="mt-6 px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="p-4 rounded-lg shadow-md bg-gray-100">
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
                                <p className="mt-3 text-gray-700">{post.productName}</p>
                                <p className="mt-1 text-gray-700">{post.description}</p>
                                <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
                                {market && (
                                    <img src={market} alt="Post" className="mt-3 rounded-lg shadow-md h-auto" />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-4">No posts available</p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Myposts;
