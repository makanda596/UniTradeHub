import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import market from "../assets/market.avif";
import moment from "moment";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTrash, FaEdit, FaRegClock, FaUser } from "react-icons/fa";

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
                const token= localStorage("token")
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/userposts`,{
                    header:{Authorization:{`Bearer ${token}`}}
                    }
                );
                setUser(response.data);
                setPosts(response.data.posts || []);
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
            text: "You won't be able to recover this post!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            backdrop: `
                rgba(0,0,0,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
            `
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

                Swal.fire({
                    title: "Deleted!",
                    text: "Your post has been deleted.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete the post.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        }
    };

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Skeleton */}
                        <div className="w-full md:w-1/4">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <Skeleton height={150} className="w-full" />
                                <div className="p-6 flex flex-col items-center">
                                    <Skeleton circle height={96} width={96} className="-mt-16 mb-4" />
                                    <Skeleton height={24} width={150} className="mb-2" />
                                    <Skeleton height={16} width={200} className="mb-1" />
                                    <Skeleton height={16} width={180} />
                                </div>
                            </div>
                        </div>

                        {/* Posts Skeleton */}
                        <div className="w-full md:w-3/4">
                            <Skeleton height={32} width={200} className="mb-6" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                                        <div className="flex justify-between mb-4">
                                            <div className="flex items-center">
                                                <Skeleton circle height={40} width={40} />
                                                <div className="ml-3">
                                                    <Skeleton height={16} width={100} />
                                                    <Skeleton height={12} width={120} className="mt-1" />
                                                </div>
                                            </div>
                                            <Skeleton height={32} width={80} />
                                        </div>
                                        <Skeleton height={20} width="70%" className="mb-3" />
                                        <Skeleton count={2} className="mb-4" />
                                        <Skeleton height={12} width="40%" />
                                        <Skeleton height={180} className="mt-4 rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    if (error) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Posts</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Navbar user={user} />
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Section */}
                        <div className="w-full md:w-1/4">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-8">
                                <div
                                    className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 bg-cover bg-center relative"
                                    style={{ backgroundImage: `url(${market})` }}
                                >
                                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                        <img
                                            src={user?.profilepic || "/default-profile.png"}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="pt-16 pb-6 px-6 text-center">
                                    <h2 className="text-xl font-bold text-gray-800">{user?.username || "User Name"}</h2>
                                    <p className="text-gray-500 text-sm mt-1">{user?.email || "No email available"}</p>
                                    <p className="text-gray-600 mt-3 text-sm">{user?.bio || "No bio available"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Posts Section */}
                        <div className="w-full md:w-3/4">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-semibold text-gray-800">My Posts</h3>
                                    <span className="text-sm text-gray-500">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span>
                                </div>

                                {posts.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {posts.map((post) => (
                                            <div key={post._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                                                <div className="relative">
                                                    <img
                                                        src={post.image}
                                                        alt=""
                                                        className="w-full h-48 object-cover"
                                                    />
                                                    <button
                                                        onClick={() => handleDelete(post._id)}
                                                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h4 className="font-bold text-gray-800">{post.productName}</h4>
                                                            <p className="text-blue-600 font-medium mt-1">KSh {post.price || "N/A"}</p>
                                                        </div>
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <FaRegClock className="mr-1" />
                                                            {timeAgo(post.createdAt)}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <FaUser className="mr-1" />
                                                        {user?.location || "Location not specified"}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-medium text-gray-700 mb-2">No Posts Yet</h4>
                                        <p className="text-gray-500 max-w-md mx-auto">You haven't created any posts yet. Start by creating your first listing!</p>
                                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                                            Create Post
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Myposts;