import React, { useEffect, useState } from "react";
import axios from "axios";
import market from '../assets/market.avif';
import AllPosts from "./AllPosts";

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
        <div className="flex flex-col sm:flex-row h-screen bg-gray-100 p-4">
            {/* User Information - Appears first on small screens */}
            <div className="p-2 mr-6 rounded-xl shadow-lg">
                <div className="w-full bg-white p-2 rounded-xl shadow-lg">
                    <div className="flex flex-col items-center p-2 relative">
                        <div
                            className="w-full h-24 bg-cover bg-center rounded-t-2xl"
                            style={{ backgroundImage: `url(${market})` }}
                        ></div>

                        <img
                            src={user?.profilepic || "https://via.placeholder.com/100"}
                            alt="Profile"
                            className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 mt-[-40px]"
                        />

                        <h2 className="text-lg font-semibold mt-2">{user?.username}</h2>
                        <h2 className="text-lg font-semibold mt-2">{user?.email}</h2>
                        
                    </div>
                </div>

                <div className="mt-2 bg-yellow-300 p-2 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Dashboard Stats</h3>
                    <ul className="text-gray-700 mt-2">
                        <a href='/post' className="py-1 flex text-blue-600 justify-between">Posts <span className="font-bold">0</span></a>
                        <li className="py-1 flex justify-between">Bookmarked <span className="font-bold">0</span></li>
                        <li className="py-1 flex justify-between">Alerts <span className="font-bold">0</span></li>
                    </ul>
                </div>
                
            </div>

            {/* Main Content - Appears second on small screens */}
            <AllPosts/>
        </div>
    );
};

export default Dashboard;
