import React, { useEffect, useState } from "react";
import market from "../assets/market.avif";
import AllPosts from "./AllPosts";
import Categories from "./Categories";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaBookmark, FaEnvelope, FaComments, FaChartBar, FaSearch } from "react-icons/fa";

const Dashboard = ({ user, userId }) => {
    const [error, setError] = useState("");
    const [count, setCount] = useState(null);
    const [countReviews, setCountReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [allPosts, setAllPosts] = useState([]);

    // Function to count user posts
    const countPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/auth/countposts/${userId}`);
            setCount(response.data);
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
            setCountReviews(response.data);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching reviews:", error);
        }
    };

    // Function to fetch all posts
    const fetchAllPosts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/posts/all");
            setAllPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Failed to load posts");
        } finally {
            setLoading(false);
        }
    };

    // Function to search posts
    const searchPosts = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await axios.get(`http://localhost:5000/posts/search?q=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error searching posts:", error);
            setError("Failed to search posts");
        } finally {
            setIsSearching(false);
        }
    };

    // Debounce search function
    useEffect(() => {
        const timer = setTimeout(() => {
            searchPosts(searchQuery);
        }, 500); // 500ms debounce delay

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        countPosts();
        countReview();
        fetchAllPosts();
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
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* User Information Sidebar */}
                    <div className="lg:w-72 lg:fixed h-full">
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

                            <div className="border-t border-gray-200 px-6 py-2">
                                <h3 className="flex items-center text-gray-700 font-medium mb-2">
                                    <FaChartBar className="mr-2 text-blue-500" />
                                    Dashboard Stats
                                </h3>

                                <ul className="space-y-1">
                                    <a
                                        href={`/Myposts/${user?._id}`}
                                        className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition"
                                    >
                                        <span className="text-gray-600">Posts</span>
                                        <span className="font-bold text-blue-600">
                                            {count?.postCount || "0"}
                                        </span>
                                    </a>
                                    <a
                                        href={`/customerreviews/${user?._id}`}
                                        className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition"
                                    >
                                        <span className="text-gray-600">Customer Reviews</span>
                                        <span className="font-bold text-blue-600">
                                            {countReviews || "0"}
                                        </span>
                                    </a>
                                    <div className="flex justify-between items-center p-2">
                                        <span className="text-gray-600 flex items-center">
                                            <FaBookmark className="mr-2 text-gray-400" />
                                            Bookmarked
                                        </span>
                                        <span className="font-bold text-gray-600">0</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2">
                                        <span className="text-gray-600 flex items-center">
                                            <FaEnvelope className="mr-2 text-gray-400" />
                                            Messages
                                        </span>
                                        <span className="font-bold text-gray-600">0</span>
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

                        {/* Search Bar */}
                        <div className="mb-6 relative">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search posts by title or description..."
                                    className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                            {isSearching && (
                                <div className="absolute right-3 top-3">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                                </div>
                            )}
                        </div>

                        {/* Always display all posts */}
                        <AllPosts user={user} posts={allPosts} />

                        {/* Display search results overlay when searching */}
                        {searchQuery && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
                                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto p-6 mx-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">
                                            Search Results for "{searchQuery}"
                                        </h2>
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <FaTimes className="text-xl" />
                                        </button>
                                    </div>
                                    
                                    {isSearching ? (
                                        <div className="flex justify-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {searchResults.map((post) => (
                                                <div key={post._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                                                    <div className="p-4">
                                                        <h3 className="font-bold text-lg text-gray-800 mb-2">
                                                            {post.productName}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mb-3">
                                                            {post.description}
                                                        </p>
                                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                                            <span>{post.category}</span>
                                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No posts found matching your search.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
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