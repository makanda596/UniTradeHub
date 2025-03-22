import React, { useEffect, useState } from "react";
import axios from "axios";
import market from "../assets/market.avif";
import Post from "../components/Post.jsx";
import moment from "moment";
import { FaThumbsUp, FaComment, FaShare, FaWhatsapp } from "react-icons/fa";

const AllPosts = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [likedPosts, setLikedPosts] = useState({});
    const [trendingPosts] = useState([
        { productName: "Smartphone X", description: "The latest smartphone with AI features." },
        { productName: "Gaming Laptop Y", description: "A powerful laptop for gaming enthusiasts." },
        { productName: "Wireless Earbuds Z", description: "High-quality sound with noise cancellation." }
    ]);

    const defaultAvatar = "https://via.placeholder.com/50";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/posts/allposts");
                setPosts(response.data);
            } catch (err) {
                console.error("Failed to fetch posts", err);
            }
        };
        fetchPosts();
    }, []);

    const timeAgo = (date) => moment(date).fromNow();

    const addNewPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setIsCreating(false);
    };

    const handleLike = (index) => {
        setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index].likes = (updatedPosts[index].likes || 0) + (likedPosts[index] ? -1 : 1);
            setLikedPosts((prev) => ({ ...prev, [index]: !prev[index] }));
            return updatedPosts;
        });
    };

    const handleComment = () => console.log("Comment feature coming soon!");

    const handleShare = (post) => {
        navigator.clipboard.writeText(`Check out this post: ${post.productName}`);
        alert("Post link copied to clipboard!");
    };

    const generateWhatsAppLink = (phoneNumber, post) => {
        let formattedPhone = phoneNumber.replace(/\D/g, "");
        if (formattedPhone.startsWith("254") && formattedPhone.length === 12) {
            return `https://wa.me/${formattedPhone}?text=Check out this post: ${post.productName}`;
        }
        return null;
    };

    return (
        <div className="flex flex-col flex-1 max-w-xl mx-auto p-1 mt-1">
            {!isCreating ? (
                <button
                    onClick={() => setIsCreating(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    ➕ Create a Post
                </button>
            ) : (
                <Post user={user} onClose={() => setIsCreating(false)} onPostCreated={addNewPost} />
            )}

            <div className="p-6 rounded-2xl shadow-lg bg-white mb-6">
                <h1 className="text-xl font-bold mb-4 text-gray-800">Trending Posts</h1>
                <div className="flex gap-6 overflow-x-auto">
                    {posts
                        .slice(8, 12) 
                        .map((post, index) => (
                            <div key={index} className="p-4 bg-gray-50 border rounded-lg min-w-[200px] shadow-md hover:shadow-lg transition duration-300">
                                <img src={market} alt="Trending post" className="w-full h-32 object-cover rounded-lg mb-2" />
                                <img
                                    src={post?.createdBy?.profilepic || defaultAvatar}
                                    alt={post?.createdBy?.username}
                                    className="w-12 h-12 rounded-full border-1 border-gray-300 object-cover"
                                />
                                <h3 className="text-lg font-bold text-gray-800">{post.productName}</h3>
                                <p className="text-gray-600">{post.description}</p>
                            </div>
                        ))}
                </div>
            </div>


            <div className="p-0">
                <h1 className="text-xl font-bold text-gray-800 mb-4"> All Posts</h1>
                <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <li key={index} className="pl-4  bg-white shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post?.createdBy?.profilepic || defaultAvatar}
                                            alt={post?.createdBy?.username}
                                            className="w-12 h-12 rounded-full border-1 border-gray-300 object-cover"
                                        />
                                        <div>
                                            <p className="text-md font-bold text-gray-800">
                                                {post?.createdBy?.username || "Unknown"}
                                            </p>
                                            <p className="text-xs font-medium text-blue-500">{post?.createdBy?.phoneNumber || "N/A"}</p>
                                            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>

                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-black pr-2">{post?.category || "N/A"}</p>

                                </div>

                                <div>
                                    <h3 className="text-md font-semibold text-gray-800">{post.productName}</h3>
                                    <p className="text-gray-600">{post.description}</p>
                                </div>

                                <img src={market} alt="Post" className="w-full h-auto object-cover " />
<div className="border-1 border-gray-400 w-full mb-[-10px]"></div>
                                <div className="flex justify-between items-center py-1 text-gray-600">

                                    <button onClick={() => handleLike(index)} className={`flex items-center gap-1 ${likedPosts[index] ? 'text-blue-600' : ''} transition`}>
                                        <FaThumbsUp />{post.likes || 0} Like
                                    </button>
                                    <button onClick={handleComment} className="flex items-center gap-1 hover:text-blue-600 transition">
                                        <FaComment /> Comment
                                    </button>
                                   
                                    <button
                                        onClick={() => {
                                            if (post?.createdBy?.phoneNumber) {
                                                let formattedPhone = post.createdBy.phoneNumber.trim();

                                                // Ensure it starts with country code (+254 for Kenya)
                                                if (!formattedPhone.startsWith("+")) {
                                                    formattedPhone = "+254" + formattedPhone.slice(-9); // Assume last 9 digits are the valid number
                                                }

                                                const waLink = `https://wa.me/${formattedPhone}`;
                                                window.open(waLink, "_blank");
                                            } else {
                                                alert("Phone number is not available for this post.");
                                            }
                                        }}
                                        className="flex items-center text-green-600 transition"
                                    >
                                        <FaWhatsapp /> WhatsApp
                                    </button>

                                    <button onClick={() => handleShare(post)} className="flex items-center  hover:text-blue-600 transition">
                                        <FaShare />Share
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center text-lg">No posts found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AllPosts;
