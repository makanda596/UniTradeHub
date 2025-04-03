import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiBookmark, FiMail, FiBarChart2, FiArrowRight, FiUser, FiMessageSquare } from "react-icons/fi";
import { FaBookmark, FaEnvelope, FaComments, FaChartBar, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import AllPosts from "./AllPosts";
import Categories from "./Categories";
import market from "../assets/market.avif";

const Dashboard = ({ user, userId }) => {
    const [error, setError] = useState("");
    const [counts, setCounts] = useState({ posts: 0, reviews: 0 });
    const [loading, setLoading] = useState(true);

    const fetchCounts = async () => {
        try {
            const token = localStorage.getItem("token");
            const [postsRes, reviewsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/countposts`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/countReviews`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setCounts({
                posts: postsRes.data?.postCount || 0,
                reviews: reviewsRes.data || 0
            });
        } catch (error) {
            setError(error.response?.data?.message || "Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Skeleton */}
                        <div className="lg:w-72 lg:fixed h-full">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <Skeleton circle height={96} width={96} className="mx-auto mb-4" />
                                <Skeleton height={24} width={160} className="mx-auto mb-2" />
                                <Skeleton height={16} width={200} className="mx-auto mb-6" />
                                <div className="space-y-4">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="flex justify-between items-center p-2">
                                            <Skeleton height={16} width={120} />
                                            <Skeleton height={16} width={40} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Skeleton */}
                        <div className="lg:ml-80 flex-1 space-y-6">
                            <Skeleton height={400} className="rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 pt-14 lg:pt-20">
            <div className="container mx-auto px-0 md:px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* User Profile Sidebar */}
                    <div className="hidden lg:flex lg:w-72 lg:fixed h-full">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
                            <div className="h-40 bg-blue-50 relative">
                                <img
                                    src={market}
                                    alt="Cover"
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                    <img
                                        src={user?.profilepic || "https://via.placeholder.com/100"}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                </div>
                            </div>

                            <div className="pt-16 pb-4 px-6 text-center">
                                <h2 className="text-xl font-bold text-gray-800 truncate">{user?.username}</h2>
                                <p className="text-gray-500 text-sm mt-1 truncate">{user?.email}</p>
                            </div>

                            <nav className="border-t border-gray-100 px-4 py-4">
                                <ul className="space-y-2">
                                    {[
                                        {
                                            icon: <FiUser className="w-5 h-5" />,
                                            label: "Posts",
                                            count: counts.posts,
                                            link: "/Myposts"
                                        },
                                        {
                                            icon: <FiMessageSquare className="w-5 h-5" />,
                                            label: "Reviews",
                                            count: counts.reviews,
                                            link: `/customerreviews/${user?._id}`
                                        },
                                        {
                                            icon: <FiBookmark className="w-5 h-5" />,
                                            label: "Bookmarked",
                                            count: 0
                                        },
                                        {
                                            icon: <FiBarChart2 className="w-5 h-5" />,
                                            label: "Analytics",
                                            link: "/chart"
                                        }
                                    ].map((item, index) => (
                                        <li key={index}>
                                            {item.link ? (
                                                <Link
                                                    to={item.link}
                                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-blue-600">{item.icon}</span>
                                                        <span className="text-gray-600 group-hover:text-blue-600">
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    {typeof item.count === 'number' ? (
                                                        <span className="bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full text-sm">
                                                            {item.count}
                                                        </span>
                                                    ) : (
                                                        <FiArrowRight className="text-gray-400 group-hover:text-blue-600" />
                                                    )}
                                                </Link>
                                            ) : (
                                                <div className="flex items-center justify-between p-3 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-gray-400">{item.icon}</span>
                                                        <span className="text-gray-600">{item.label}</span>
                                                    </div>
                                                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-sm">
                                                        {item.count}
                                                    </span>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:ml-80 flex-1">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-center gap-3">
                                <FiAlertTriangle className="text-red-500 flex-shrink-0" />
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