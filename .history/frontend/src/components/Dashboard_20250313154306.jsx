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
            <div className="  p-6 mr-6 rounded-2xl shadow-lg">
            <div className="w-full bg-white p-6 mr-6 rounded-2xl shadow-lg">
                <div className="flex flex-col items-center">
                    <img src={user?.profilepic || "https://via.placeholder.com/100"} alt="Profile" className="w-20 h-20 object-cover rounded-full border-2 border-gray-300" />
                    <h2 className="text-lg font-semibold mt-2">{user?.username}</h2>
                    <p className="text-gray-600 text-sm">Nairobi, Nairobi County</p>
                    <p className="text-gray-500 text-sm">Moi University</p>
                </div>
                </div>

                <div className="mt-4 bg-yellow-400 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Dashboard Stats</h3>
                    <ul className="text-gray-700 mt-2">
                        <li className="py-1 flex justify-between">Posts <span className="font-bold">0</span></li>
                        <li className="py-1 flex justify-between">Bookmarked <span className="font-bold">0</span></li>
                        <li className="py-1 flex justify-between">Alerts <span className="font-bold">0</span></li>
                    </ul>
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