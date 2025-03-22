import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [trendingPosts, setTrendingPosts] = useState([
        { productName: "Smartphone X", description: "The latest smartphone with AI features." },
        { productName: "Gaming Laptop Y", description: "A powerful laptop for gaming enthusiasts." },
        { productName: "Wireless Earbuds Z", description: "High-quality sound with noise cancellation." }
    ]);

    const defaultPostImage = "https://source.unsplash.com/600x400/?technology,gadgets"; // Default image
    const defaultAvatar = "https://via.placeholder.com/50"; // Default profile image

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/posts/allposts");
                setPosts(response.data);
            } catch (err) {
                console.log("Failed to fetch posts");
                console.error(err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col w-full min-h-screen p-6 bg-gray-100">
            {/* Trending Posts */}
            <div className="p-6 rounded-2xl shadow-lg bg-white mb-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">🔥 Trending Posts</h1>
                <div className="flex gap-6 overflow-x-auto">
                    {trendingPosts.length > 0 ? (
                        trendingPosts.map((post, index) => (
                            <div key={index} className="p-4 bg-gray-50 border rounded-lg min-w-[200px] shadow-md hover:shadow-lg transition duration-300">
                                <img src={defaultPostImage} alt="Trending post" className="w-full h-32 object-cover rounded-lg mb-2" />
                                <h3 className="text-lg font-bold text-gray-800">{post.productName}</h3>
                                <p className="text-gray-600">{post.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No trending posts found.</p>
                    )}
                </div>
            </div>

            {/* All Posts with Responsive Meme Layout */}
            <div className="p-6 rounded-2xl shadow-lg bg-white">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">📝 All Posts</h1>
                <ul className="space-y-6">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <li key={index} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col md:flex-row md:items-center gap-4">
                                {/* Post Image (Stacks on small screens, side-by-side on large screens) */}
                                <img src={defaultPostImage} alt="Post" className="w-full md:w-1/3 h-48 object-cover rounded-lg" />

                                {/* Text Content */}
                                <div className="flex flex-col gap-2 text-center md:text-left">
                                    <h3 className="text-xl font-bold text-gray-800">{post.productName}</h3>
                                    <p className="text-gray-600">{post.description}</p>

                                    {/* User Info */}
                                    <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                                        <img
                                            src={post?.createdBy?.profilepic || defaultAvatar}
                                            alt={post?.createdBy?.username}
                                            className="w-10 h-10 rounded-full border border-gray-300"
                                        />
                                        <div>
                                            <p className="text-sm text-gray-700 font-medium">
                                                Posted by: {post?.createdBy?.username || "Unknown"}
                                            </p>
                                            <p className="text-sm text-gray-500">📞 WhatsApp: {post?.createdBy?.phoneNumber || "N/A"}</p>
                                        </div>
                                    </div>
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
