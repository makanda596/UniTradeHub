import React, { useEffect, useState } from "react";
import market from "../assets/market.avif";
import AllPosts from "./AllPosts";
import Categories from "./Categories";
import axios from "axios";

const Dashboard = ({ user, userId }) => {
    const [error, setError] = useState("");
    const [count, setCount] = useState(0);
    const [countReviews, setCountReviews] = useState(0);  // Initialize as a number

    // Function to count user posts
    const countPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/auth/countposts/${userId}`);
            setCount(response.data);
            console.log("Post Count:", response.data.postCount);
        } catch (error) {
            setError(error.message);
        }
    };

    // Function to count reviews
    const countReview = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized: Please log in to view review count.");
                return;
            }

            const response = await axios.get("http://localhost:5000/reviews/countReviews", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Review Count Response:", response.data);
            setCountReviews(response.data);  // Store only the review count
        } catch (error) {
            setError(error.message);
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        countPosts();
    }, [userId]);

    useEffect(() => {
        countReview();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row pt-20 lg:px-16 px-0 bg-white">
            {error && <p className="text-red-500">{error}</p>}

            {/* User Information */}
            <div className="pl-4 rounded-sm bg-white md:rounded-xl shadow-lg 
                 lg:fixed lg:w-[300px] lg:h-96 lg:overflow-auto">
                <div className="flex flex-col items-center bg-gray-200 p-1 relative">
                    <div
                        className="w-full h-24 bg-cover bg-center rounded-t-xl"
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

                {/* Dashboard Stats */}
                <div className="mt-2 bg-blue-300 p-1 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Dashboard Stats</h3>
                    <ul className="text-gray-700 mt-2">
                        <a href={`/Myposts/${user?._id}`} className="py-1 flex text-black-600 justify-between">
                            Posts <span className="font-bold">{count.postCount || "0"}</span>
                        </a>
                        <a href={`/customerreviews/${user?._id}`}> <li className="py-1 flex justify-between">
                            Customers Reviews <span className="font-bold">{countReviews || "0"}</span>
                        </li></a>
                        <li className="py-1 flex justify-between">
                            Bookmarked <span className="font-bold">0</span>
                        </li>
                        <li className="py-1 flex justify-between">
                            Messages<span className="font-bold">0</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-[320px] flex flex-col lg:flex-row w-full gap-4 px-0">
                <div className="flex-1">
                    <AllPosts user={user} />
                </div>
                <div className="hidden lg:block w-[320px]">
                    <Categories />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
