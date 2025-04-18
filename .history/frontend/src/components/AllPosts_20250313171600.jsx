import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [trendingPosts, setTrendingPosts] = useState([
        { productName: "Smartphone X", description: "The latest smartphone with AI features." },
        { productName: "Gaming Laptop Y", description: "A powerful laptop for gaming enthusiasts." },
        { productName: "Gaming Laptop Y", description: "A powerful laptop for gaming enthusiasts." },
        { productName: "Gaming Laptop Y", description: "A powerful laptop for gaming enthusiasts." },
        { productName: "Wireless Earbuds Z", description: "High-quality sound with noise cancellation." }
    ]);

    useEffect(() => {
        const fetchPosts = async () => {

            try {
                const response = await axios.get("http://localhost:5000/posts/allposts");
                setPosts(response.data); // Ensure it's an array
                
            } catch (err) {
                console.log("Failed to fetch posts");
                console.error(err);
            }
        };

        fetchPosts();
    }, []); // Refetch when user changes

    return (
        <div className="flex flex-col w-full h-screen p-6">
            {/* Trending Posts */}
            <div className="p-6 rounded-2xl shadow-lg mb-6">
                <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
                <div className="flex gap-4 overflow-x-auto">
                    {trendingPosts.length > 0 ? (
                        trendingPosts.map((post, index) => (
                            <div key={index} className="p-4 border rounded-lg min-w-[150px] shadow-md">
                                <h3 className="text-lg font-bold">post{post.productName}</h3>
                                <h3 className="text-lg font-bold">created{post.createdBy}</h3>
                                <p className="text-gray-700">{post.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No trending posts found.</p>
                    )}
                </div>
            </div>

            {/* All Posts */}
            <div className="p-6 rounded-2xl shadow-lg">
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
