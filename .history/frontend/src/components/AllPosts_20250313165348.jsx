import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPosts = ({ user }) => {
    const [posts, setPosts] = useState([]);

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

        fetchPosts();
    }, [user?._id]); // Refetch when user changes

    return (
        <div className="flex flex-col sm:flex-row h-screen bg-gray-100 p-6">
            {/* User Information - Appears first on small screens */}
            <div className="p-4 bg-white rounded-xl shadow-lg sm:w-1/3">
                <div className="flex flex-col items-center">
                    <img
                        src={user?.profilepic || "https://via.placeholder.com/100"}
                        alt="Profile"
                        className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                    />
                    <h2 className="text-lg font-semibold mt-2">{user?.username}</h2>
                    <h2 className="text-lg font-semibold mt-2">{user?.email}</h2>
                    <p className="text-gray-600 text-sm">Nairobi, Nairobi County</p>
                    <p className="text-gray-500 text-sm">Moi University</p>
                </div>
            </div>

            {/* Posts - Appears second on small screens */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg mt-6 sm:mt-0 sm:ml-6">
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
