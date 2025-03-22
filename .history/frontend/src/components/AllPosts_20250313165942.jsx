import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPosts = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!user?._id) return; // Ensure user is defined

            try {
                const response = await axios.get("http://localhost:5000/posts/allposts");
                setPosts(response.data); // Ensure it's an array
            } catch (err) {
                console.log("Failed to fetch posts");
                console.error(err);
            }
        };

        const fetchTrendingPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/posts/trending");
                setTrendingPosts(response.data);
            } catch (err) {
                console.log("Failed to fetch trending posts");
                console.error(err);
            }
        };

        fetchPosts();
        fetchTrendingPosts();
    }, [user?._id]); // Refetch when user changes

    return (
        <div className="flex flex-row w-full sm:flex-row h-screen p-6">
            {/* Trending Posts */}
            <div className="flex-1 p-6 rounded-2xl shadow-lg mb-6">
                <h1 className="text-2xl font-bold">Trending Posts</h1>
                <ul>
                    {trendingPosts.length > 0 ? (
                        trendingPosts.map((post, index) => (
                            <li key={index} className="p-4 border-b">
                                <h3 className="text-lg font-bold">{post.productName}</h3>
                                <p className="text-gray-700">{post.description}</p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No trending posts found.</p>
                    )}
                </ul>
            </div>

            {/* All Posts */}
            <div className="flex-1 p-6 rounded-2xl shadow-lg sm:ml-6">
                <h1 className="text-2xl font-bold">All Posts</h1>
                <ul>
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <li key={index} className="p-4 border-b">
                                <h3 className="text-lg font-bold">{post.productName}</h3>
                                <p className="text-gray-700">{post.description}</p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No posts found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AllPosts;