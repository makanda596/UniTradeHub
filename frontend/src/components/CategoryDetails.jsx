import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft, FaTag, FaRegClock, FaMapMarkerAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Post from "../components/Post.jsx";
import Navbar from '../components/Navbar.jsx'


const CategoryDetails = () => {
    const { categoryName } = useParams();
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
        const [isCreating, setIsCreating] = useState(false);
    const addNewPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setIsCreating(false);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try { 
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/posts/posts?category=${categoryName}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    });
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
        <div>
        <div className="min-h-screen bg-gray-50 ">
                <div className="container mx-auto px-0 lg:px-10 py-4 ">
                <div className="mb-8">
                        <div className="flex items-center text-sm text-gray-600 mb-2 mt-8">
                        <Link to="/" className="hover:text-blue-600 flex items-center">
                            <FaArrowLeft className="mr-1" /> Home
                        </Link>
                        <IoIosArrowForward className="mx-2" />
                        <span className="text-blue-600 font-medium">{categoryName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-800">
                            <FaTag className="inline mr-2 text-blue-500" />
                            {categoryName}
                        </h1>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white rounded-sm lg:rounded-xl shadow-sm overflow-hidden">
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

                {!loading && posts.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-2xl mx-auto">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No Posts Found</h3>
                        <p className="text-gray-500 mb-6">There are currently no posts in the {categoryName} category.</p>
                       
                          {!isCreating ? (
                        
                                        <button
                                            onClick={() => setIsCreating(true)}
                                            className="w-96 bg-blue-600 text-white py-1 h-8 rounded-lg hover:bg-blue-700 transition"
                                        >
                                             make a Post 
                                        </button>
                                    ) : (
                                        <Post  onClose={() => setIsCreating(false)} onPostCreated={addNewPost} />
                                    )}
                    </div>
                )}

                {!loading && posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {posts.map((post,index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300 border border-gray-100">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.image || '/placeholder-product.jpg'}
                                        alt={post.productName}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                    />
                                    <span className="absolute top-3 left-3 bg-white/90 text-xs px-2 py-1 rounded-full flex items-center">
                                        <FaRegClock className="mr-1" />
                                        {formatDate(post.createdAt)}
                                    </span>
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img
                                            src={post?.createdBy?.profilepic || '/default-profile.png'}
                                            alt=""
                                            className="w-8 h-8 rounded-full border-2 border-blue-400 object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">{post?.createdBy?.username || "Unknown"}</p>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <FaMapMarkerAlt className="mr-1" />
                                                <span>{post.location || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-0">
                                        <h2 className="text-lg font-bold text-gray-800 mb-0">
                                            <p className="hover:text-blue-600">
                                                {post.productName}
                                            </p>
                                        </h2>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-1">{post.description.length > 40 ? (<p>{post.description.slice(0,40)}...</p>) : (<>{post.description}</>)}</p>
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        <Link
                                            to={`/Onepost/${post._id}`}
                                            className="flex bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-center text-sm font-medium transition"
                                        >
                                            View Details
                                        </Link>
                                       
                                        <Link to={`/Chart/${post?.createdBy?._id}`}> <button className=" bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1">
                                            Contact Seller
                                        </button></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default CategoryDetails;