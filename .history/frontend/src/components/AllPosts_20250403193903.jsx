import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post.jsx";
import moment from "moment";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton.jsx";

const AllPosts = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const defaultAvatar = "https://via.placeholder.com/50";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/posts/allposts`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setPosts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch posts", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const timeAgo = (date) => moment(date).fromNow();

    const addNewPost = (newPost) => {
        setPosts((prev) => [newPost, ...prev]);
        setIsCreating(false);
    };

    if (isLoading) return (
        <div className="max-w-xl mx-auto space-y-6 p-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white p-4 rounded-xl shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-xl" />
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col flex-1 max-w-xl mx-auto mt-0 space-y-6">
            {/* Create Post Header */}
            <div className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-md">
                <img
                    src={user?.profilepic || defaultAvatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                />
                {!isCreating ? (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Create New Post
                    </button>
                ) : (
                    <Post onClose={() => setIsCreating(false)} onPostCreated={addNewPost} />
                )}
            </div>

            {/* Trending Posts */}
            <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Trending Now</h2>
                <div className="flex gap-4 pb-4 overflow-x-auto scroll-smooth snap-x">
                    {posts.slice(0, 5).map((post) => (
                        <div key={post._id} className="snap-start min-w-[200px]">
                            <Link
                                to={`/Profile/${post?.createdBy?._id}`}
                                className="block relative group"
                            >
                                <img
                                    src={post?.image}
                                    alt={post.productName}
                                    className="w-full h-48 object-cover rounded-xl transition-transform group-hover:scale-95"
                                />
                                <div className="absolute top-2 left-2">
                                    <img
                                        src={post?.createdBy?.profilepic || defaultAvatar}
                                        alt={post?.createdBy?.username}
                                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* All Posts */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold px-4 text-gray-800">Recent Posts</h2>
                <ul className="space-y-6">
                    {posts.length > 0 ? posts.map((post) => (
                        <li
                            key={post._id}
                            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            {/* Post Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Link
                                        to={`/Profile/${post?.createdBy?._id}`}
                                        className="flex items-center gap-3"
                                    >
                                        <img
                                            src={post?.createdBy?.profilepic || defaultAvatar}
                                            alt={post?.createdBy?.username}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                                                {post?.createdBy?.username || "Unknown"}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {timeAgo(post.createdAt)}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FollowButton userId={post?.createdBy?._id} />
                                    <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                        {post?.category || "General"}
                                    </span>
                                </div>
                            </div>

                            {/* Post Content */}
                            <Link to={`/Onepost/${post.category}/${post._id}`}>
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {post.productName}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3">
                                        {post.description}
                                    </p>
                                    {post.image && (
                                        <img
                                            src={post.image}
                                            alt={post.productName}
                                            className="w-full h-64 object-cover rounded-xl"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                            </Link>
                        </li>
                    )) : (
                        <div className="text-center py-8 bg-white rounded-xl shadow-md">
                            <p className="text-gray-500">No posts found. Be the first to create one!</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AllPosts;