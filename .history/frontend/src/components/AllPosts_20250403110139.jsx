import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post.jsx";
import moment from "moment";
import { FaThumbsUp, FaComment, FaShare, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton.jsx";

const AllPosts = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const defaultAvatar = "https://via.placeholder.com/50";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_POST_API}/posts/allposts`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                // Ensure response data is an array
                setPosts(Array.isArray(response?.data) ? response.data : []);
            } catch (err) {
                console.error("Failed to fetch posts", err);
                setPosts([]); // Ensure posts remains an array on error
            }
        };
        fetchPosts();
    }, []);

    const timeAgo = (date) => moment(date).fromNow();

    const addNewPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setIsCreating(false);
    };

    return (
        <div className="flex flex-col flex-1 max-w-xl mx-auto mt-0">
            {/* Header Section */}
            <div className="flex gap-6 justify-center items-center bg-white py-2">
                <img 
                    src={user?.profilepic || defaultAvatar} 
                    alt="Profile" 
                    className="w-12 h-12 object-cover rounded-full"
                />
                {!isCreating ? (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="w-96 bg-blue-600 text-white py-1 h-8 rounded-lg hover:bg-blue-700 transition"
                    >
                        Make a Post
                    </button>
                ) : (
                    <Post onClose={() => setIsCreating(false)} onPostCreated={addNewPost} />
                )}
            </div>

            {/* Trending Posts Section */}
            <div className="p-1 mt-4 w-full bg-white mb-2">
                <h1 className="text-lg font-bold ml-4 text-gray-800">Trending Posts</h1>
                <div className="mt-1 flex gap-2 px-4 overflow-x-auto">
                    {(posts || []).slice(0, 6).map((post) => (
                        <div key={post._id} className="min-w-[200px]">
                            <div className="relative shadow-md hover:shadow-xl transition duration-300">
                                <Link to={`/Profile/${post?.createdBy?._id}`}>
                                    <img 
                                        src={post?.image || defaultAvatar} 
                                        alt="Post" 
                                        className="w-30 h-52 object-cover rounded-lg mb-2" 
                                    />
                                    <div className="absolute top-3 ml-2">
                                        <img
                                            src={post?.createdBy?.profilepic || defaultAvatar}
                                            alt={post?.createdBy?.username || "User"}
                                            className="w-8 h-8 rounded-full border-2 border-blue-400 object-cover"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <p className="text-gray-500 text-sm">No trending posts found</p>
                    )}
                </div>
            </div>

            {/* All Posts Section */}
            <div className="p-0 bg-white">
                <h1 className="text-xl font-bold text-gray-800 mb-2 ml-6">All Posts</h1>
                <ul className="grid grid-cols-1 gap-3">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <li 
                                key={post._id} 
                                className="pl-4 bg-white shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-2"
                            >
                                {/* Post Header */}
                                <div className="flex items-center justify-between p-2">
                                    <div className="flex items-center gap-4">
                                        <Link to={`/Profile/${post?.createdBy?._id}`}>
                                            <img
                                                src={post?.createdBy?.profilepic || defaultAvatar}
                                                alt={post?.createdBy?.username || "User"}
                                                className="w-12 h-12 rounded-full border-1 border-gray-300 object-cover"
                                            />
                                        </Link>
                                        <div>
                                            <Link 
                                                to={`/Profile/${post?.createdBy?._id}`}
                                                className="text-md font-bold text-gray-800 hover:text-blue-600"
                                            >
                                                {post?.createdBy?.username || "Unknown"}
                                            </Link>
                                            <p className="text-xs text-gray-500">
                                                {timeAgo(post?.createdAt || new Date())}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FollowButton userId={post?.createdBy?._id} />
                                        <p className="text-sm font-medium text-black pr-2">
                                            {post?.category || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <Link to={`/Onepost/${post?.category}/${post?._id}`}>
                                    <div className="p-2">
                                        <h3 className="text-md font-semibold text-gray-800">
                                            {post?.productName}
                                        </h3>
                                        <p className="text-gray-600">
                                            {post?.description?.length > 60 
                                                ? `${post.description.slice(0, 60)}...`
                                                : post?.description}
                                        </p>
                                    </div>
                                    <img 
                                        src={post?.image || defaultAvatar} 
                                        alt="Post" 
                                        className="w-full h-96 object-cover"
                                    />
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center text-lg py-4">
                            No posts found. Be the first to create one!
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AllPosts;