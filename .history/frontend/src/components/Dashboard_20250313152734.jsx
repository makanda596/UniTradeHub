import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/posts");
                setPosts(response.data);
            } catch (error) {
                console.error("Failed to fetch posts. Using dummy data.");
                setPosts([
                    {
                        id: 1,
                        title: "Gaming Laptop for Sale",
                        description: "High-performance laptop, barely used.",
                        image: "https://via.placeholder.com/300",
                    },
                    {
                        id: 2,
                        title: "Brand New Smartphone",
                        description: "Latest model, sealed in box.",
                        image: "https://via.placeholder.com/300",
                    },
                ]);
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
                    <p className="text-gray-700"><strong>Name:</strong> John Doe</p>
                    <p className="text-gray-700 mt-2"><strong>Email:</strong> john.doe@example.com</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Logout</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome to your dashboard. Here you can see the latest updates and analytics.</p>
                {/* Add more dashboard content here */}
            </div>
        </div>
    );
};

export default Dashboard;
