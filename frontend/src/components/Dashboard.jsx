
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
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const Dashboard = ({ user, userId }) => {
    const { countCarts, countReviwes,loading,CountReviews,count}= useAuthStore()
    const [error,setError]=useState('')
        const[countposts,setCountposts] = useState(null)

    const countPosts = async () => {
        try {

            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/countposts`, {
                headers:{Authorization:`Bearer ${token}`}
            });
            setCountposts(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load  data. Please try again.");
        }
    };


    useEffect(() => {
        countPosts();
        countCarts()
       countReviwes();
    }, [userId]);

    if (loading) {
        return (
            <LoadingSpinner/>
        );
    }
    if(error){
        return (<ErrorMessage error={error} />)
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 pt-14 lg:pt-20">
            <div className="container mx-auto px-0 md:px-4">
                <div className="flex flex-col lg:flex-row gap-8">
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
                                        href={'/customerreviews'}
                                        className="flex justify-between items-center hover:bg-gray-50 p-1 rounded-lg transition"
                                    >
                                        <span className="text-gray-600">Customer Reviews</span>
                                        <span className="font-bold text-blue-600">
                                            {CountReviews || "0"}
                                        </span>
                                    </a>
                                    <a
                                        href="/saved"
                                        className="flex justify-between items-center hover:bg-gray-50 p-1 rounded-lg transition"
                                    >
                                        <span className="text-gray-600">saved posts</span>
                                        <span className="font-bold text-blue-600">
                                            {count || "0"}
                                        </span>
                                    </a>
                                
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

                    <div className="lg:ml-80 flex-1">
                                               <AllPosts user={user} />
                    </div>

                    <div className="hidden lg:block w-72">
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;