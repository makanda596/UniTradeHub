
 import React, { useEffect, useState } from "react";

import market from "../assets/market.avif";
import AllPosts from "./AllPosts";
import Categories from "./Categories";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaBookmark, FaEnvelope, FaComments, FaChartBar, FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "../utilis/auth";

const Dashboard = ({ user, userId }) => {
    const [error, setError] = useState("");
        const { countCarts, count}= useAuthStore()
        const[countposts,setCountposts] = useState(null)
    const [loading, countReviwesFunction, CountReviews] = useState(true);

    const countPosts = async () => {
        try {

            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/countposts`, {
                headers:{Authorization:`Bearer ${token}`}
            });
            setCountposts(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Function to count reviews
   

    useEffect(() => {
        countPosts();
        countCarts()
       countReviwesFunction();
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Skeleton */}
                        <div className="lg:w-72 lg:fixed h-full">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <Skeleton circle height={80} width={80} className="mx-auto mb-4" />
                                <Skeleton height={20} width={150} className="mx-auto mb-2" />
                                <Skeleton height={16} width={200} className="mx-auto mb-6" />

                                <div className="space-y-4">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="flex justify-between items-center">
                                            <Skeleton height={16} width={120} />
                                            <Skeleton height={16} width={30} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Skeleton */}
                        <div className="lg:ml-80 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                                        <Skeleton height={180} className="mb-4 rounded-lg" />
                                        <Skeleton height={20} width="80%" className="mb-2" />
                                        <Skeleton height={16} count={2} className="mb-3" />
                                        <Skeleton height={12} width="60%" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Categories Skeleton */}
                        <div className="hidden lg:block w-72">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <Skeleton height={24} width={120} className="mb-4" />
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} height={16} className="mb-2" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 pt-14 lg:pt-20">
            <div className="container mx-auto px-0 md:px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* User Information Sidebar */}
                    <div className="hidden lg:flex lg:w-72 lg:fixed h-full ">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div
                                className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative"
                                style={{ backgroundImage: `url(${market})` }}
                            >
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                    <img
                                        src={user?.profilepic || "https://via.placeholder.com/100"}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                                    />
                                </div>
                            </div>

                            <div className="pt-12 pb-2 px-6 text-center">
                                <h2 className="text-xl font-bold text-gray-800">{user?.username}</h2>
                                <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
                            </div>

                            <div className="border-t border-gray-200 h-20 px-6 py-2">
                              

                                <ul className="space-y-1">
                                    <a
                                        href="/Myposts"
                                        className="flex justify-between items-center hover:bg-gray-50 p-1 rounded-lg transition"
                                    >
                                        <span className="text-gray-600">Posts</span>
                                        <span className="font-bold text-blue-600">
                                            {countposts?.postCount || "0"}
                                        </span>
                                    </a>
                                    <a
                                        href={`/customerreviews/${user?._id}`}
                                        className="flex justify-between items-center hover:bg-gray-50 p-1 rounded-lg transition"
                                    >
                                        <span className="text-gray-600">Customer Reviews</span>
                                        <span className="font-bold text-blue-600">
                                            {CountReviews || "0"}
                                        </span>
                                    </a>
                                    <Link to="/saved" className="relative inline-block">
                                        <FaShoppingCart size={20} className="text-black" />saved posts
                                                            {count > 0 && (
                                                                <span className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white border-2 border-white shadow-md">
                                                                    {count}
                                                                </span>
                                                            )}
                                                        </Link>
                                    <div className="flex justify-between items-center p-2">
                                        <Link
                                         to='/chart' className="text-gray-600 flex items-center">
                                            <FaEnvelope className="mr-1 text-gray-400" />
                                           Charts
                                        </Link>
                                        < FaArrowRight/>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:ml-80 flex-1">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        <AllPosts user={user} />
                    </div>

                    {/* Categories Sidebar */}
                    <div className="hidden lg:block w-72">
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;