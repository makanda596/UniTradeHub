import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/posts/allposts");
                setPosts(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100 p-6">
            {/* User Information */}
            <div className="w-1/4 bg-white p-6 mr-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold">User Information</h2>
                <div className="mt-4">
                    <img src={user?.profilepic} alt="" className="w-20 h-20 object-cover rounded-full" />
                    <p className="text-gray-700 mt-2"><strong>Username:</strong> {user?.username}</p>
                    <p className="text-gray-700 mt-2"><strong>Email:</strong> {user?.email}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Logout</button>
                </div>
                {/* Bookmarked and Posts Sections */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Bookmarked</h3>
                    {/* Display bookmarked posts here */}
                    <p className="text-gray-600">No bookmarked posts yet.</p>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Your Posts</h3>
                    {/* Display user posts here */}
                    <p className="text-gray-600">No posts yet.</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome to your dashboard. Here you can see the latest updates and analytics.</p>
                {error && <p className="text-red-600 mt-2">{error}</p>}
                <div className="mt-4">
                    {posts.map((post, index) => (
                        <div key={index} className="p-4 border-b">
                            <h3 className="text-lg font-bold">{post.productName}</h3>
                            <p className="text-gray-700">{post.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
