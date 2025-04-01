import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft, FaTag, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const CategoryDetails = () => {
    const { categoryName } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts/posts?category=${categoryName}`);
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [categoryName]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Link to="/" className="hover:text-blue-600 flex items-center">
                            <FaArrowLeft className="mr-1" /> Home
                        </Link>
                        <IoIosArrowForward className="mx-2" />
                        <span className="text-blue-600 font-medium">{categoryName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-800">
                            <FaTag className="inline mr-2 text-blue-500" />
                            {categoryName}
                        </h1>
                       
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <Skeleton height={180} className="w-full" />
                                <div className="p-4">
                                    <Skeleton height={24} width="80%" className="mb-3" />
                                    <Skeleton height={16} count={2} className="mb-4" />
                                    <div className="flex justify-between">
                                        <Skeleton height={12} width="40%" />
                                        <Skeleton height={12} width="20%" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && posts.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No Posts Found</h3>
                        <p className="text-gray-500 mb-6">There are currently no posts in the {categoryName} category.</p>
                        <Link
                            to="/create-post"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-block transition"
                        >
                            Create First Post
                        </Link>
                    </div>
                )}

                {/* Posts Grid */}
                {!loading && posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <div key={post._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                                <div className="relative">
                                    <img
                                        src={post.image || '/placeholder-product.jpg'}
                                        alt={post.productName}
                                        className="w-full h-48 object-cover"
                                    />
                                    <span className="absolute top-3 left-3 bg-white/90 text-xs px-2 py-1 rounded-full flex items-center">
                                        <FaTag className="mr-1 text-blue-500" />
                                        {post.category}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-lg font-bold text-gray-800">
                                            <Link to={`/post/${post._id}`} className="hover:text-blue-600">
                                                {post.productName}
                                            </Link>
                                        </h2>
                                        <span className="text-blue-600 font-medium">KSh {post.price || 'N/A'}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span className="flex items-center">
                                            <FaRegClock className="mr-1" />
                                            {formatDate(post.createdAt)}
                                        </span>
                                        <span className="flex items-center">
                                            <FaMapMarkerAlt className="mr-1" />
                                            {post.location || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;