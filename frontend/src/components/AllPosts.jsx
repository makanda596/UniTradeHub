import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

import Post from "../components/Post.jsx";
import Flash from "../components/Flash.jsx";
import GetFlash from "./GetFlash.jsx";
import FollowButton from "./FollowButton.jsx";
import ReportPost from "./ReportPost.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

import { useAuthStore } from "../utilis/auth.js";

const AllPosts = ({ user }) => {
    const [selectedPost, setSelectedPost] = useState({ id: null, name: '' });
    const [posts, setPosts] = useState([]);
    const [openPostId, setOpenPostId] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeFlash, setActiveFlash] = useState([]);

    const defaultAvatar = "https://via.placeholder.com/50";
    const { UserFlash, Uflash } = useAuthStore();

    // Fetch user's flash sales
    useEffect(() => {
        UserFlash();
    }, []);

    // Filter active flashes
    useEffect(() => {
        if (Uflash && Array.isArray(Uflash)) {
            const now = new Date();
            const filtered = Uflash.filter(item => new Date(item.expiresAt) > now);
            setActiveFlash(filtered);
        }
    }, [Uflash]);

    // Fetch all posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/allposts`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPosts(response.data);
            } catch (err) {
                console.error("Failed to fetch posts", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const addNewPost = (newPost) => {
        setPosts(prev => [newPost, ...prev]);
    };

    const timeAgo = (date) => moment(date).fromNow();

    const handleShare = (postId, productName) => {
        const shareUrl = `${window.location.origin}/Onepost/${postId}`;
        if (navigator.share) {
            navigator.share({ title: productName, text: `Check out this post: ${productName}`, url: shareUrl });
        } else {
            navigator.clipboard.writeText(shareUrl);
        }
    };

    const handleReportClick = (postId, productName) => {
        setSelectedPost({ id: postId, name: productName });
        setOpenPostId(null);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="flex flex-col flex-1 max-w-xl mx-auto mt-0">
            {/* Create Post Section */}
            <div className="flex gap-4 items-center bg-white p-4">
                <img src={user?.profilepic || defaultAvatar} className="w-12 h-12 rounded-full object-cover" />
                {!isCreating ? (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Make a Post
                    </button>
                ) : (
                    <Post onClose={() => setIsCreating(false)} onPostCreated={addNewPost} />
                )}
            </div>

            {/* Flash Section */}
            <div className="p-2 mt-2 w-full bg-white">
                <div className="flex gap-4 overflow-x-auto items-start">
                    <div className="relative flex flex-col items-center min-w-[100px]">
                        {/* Profile Picture - Overlapping top */}
                        <img
                            src={user?.profilepic || defaultAvatar}
                            alt="You"
                            className="w-16 h-16 absolute -top-4 rounded-full border-4 border-blue-600 object-cover shadow-md z-10"
                        />

                        {/* Flash Content Section */}
                        <div className="mt-14 w-full flex flex-col items-center text-center">
                            {activeFlash.length > 0 ? (
                                activeFlash.map((item) => (
                                    <div
                                        key={item._id}
                                        className="mt-3 w-40 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
                                    >
                                        <img
                                            src={item.image}
                                            alt="Flash"
                                            className="h-24 w-full object-cover"
                                        />
                                        <div className="p-2">
                                            <p className="text-sm font-medium">{item.description}</p>
                                            <p className="text-[11px] text-gray-400 mt-1">
                                                Expires: {new Date(item.expiresAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : !isFlashing ? (
                                <button
                                    onClick={() => setIsFlashing(true)}
                                    className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
                                >
                                    Flash
                                </button>
                            ) : (
                                <Flash onClose={() => setIsFlashing(false)} onPostCreated={addNewPost} />
                            )}
                        </div>
                    </div>

                      

                    <GetFlash />
                </div>
            </div>

            {/* All Posts Section */}
            <div className="py-6 bg-gray-100">
                <h1 className="text-xl font-bold text-gray-800 mb-2 ml-6">All Posts</h1>
                <ul className="space-y-4">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <li key={index} className="bg-white p-4 shadow rounded">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Link to={`/Profile/${post.createdBy?._id}`}>
                                            <img
                                                src={post.createdBy?.profilepic || defaultAvatar}
                                                alt="user"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </Link>
                                        <div>
                                            <Link to={`/Profile/${post.createdBy?._id}`} className="font-semibold hover:underline">
                                                {post.createdBy?.username || "Unknown"}
                                            </Link>
                                            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <BsThreeDotsVertical
                                            className="text-lg cursor-pointer"
                                            onClick={() => setOpenPostId(openPostId === post._id ? null : post._id)}
                                        />
                                        {openPostId === post._id && (
                                            <div className="absolute z-10 right-0 bg-white shadow p-2 rounded w-40">
                                                <button className="text-gray-500 hover:text-red-500" onClick={() => setOpenPostId(null)}><MdCancel /></button>
                                                <button onClick={() => handleReportClick(post._id, post.productName)} className="text-sm text-red-600 w-full text-left mt-1">Report</button>
                                                <FollowButton userId={post.createdBy?._id} />
                                                <button onClick={() => handleShare(post._id, post.productName)} className="text-sm text-blue-600 w-full text-left mt-1">Share</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Link to={`/Onepost/${post._id}`}>
                                    <h3 className="mt-2 font-medium">{post.productName}</h3>
                                    <p className="text-sm text-gray-700">
                                        {post.description.length > 60 ? `${post.description.slice(0, 60)}...` : post.description}
                                    </p>
                                    <img src={post.image} alt="post" className="mt-2 w-full h-64 object-cover rounded" />
                                </Link>
                                <ReportPost
                                    popUp={selectedPost.id === post._id}
                                    setPopUp={() => setSelectedPost({ id: null, name: '' })}
                                    postId={post._id}
                                    postName={post.productName}
                                />
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No posts found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AllPosts;
