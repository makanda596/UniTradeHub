import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const RelatedProducts = ({ category, currentPostId }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRelated = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/posts/related/${category}/${currentPostId}`
                );
                setRelatedPosts(response.data);
            } catch (error) {
                console.error("Error fetching related posts:", error);
                setError("Failed to load related products.");
            } finally {
                setIsLoading(false);
            }
        };

        if (category) {
            fetchRelated();
        } else {
            setIsLoading(false);
        }
    }, [category, currentPostId]);

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-300">
                Loading related products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 text-center text-red-500">
                {error}
            </div>
        );
    }

    if (relatedPosts.length === 0) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center mb-6">
                <BiCategory className="text-xl mr-2 text-gray-600 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-800 text-black">
                    More in {category}
                </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {relatedPosts.map((post) => (
                    <Link
                        to={`/Onepost/${post._id}`}
                        key={post._id}
                        className="block rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="relative">
                            <img
                                src={post.image}
                                alt={post.productName}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                           
                        </div>
                        <div className="p-4">
                            <h4 className="text-lg font-semibold text-gray-900 text-black line-clamp-2 mb-2">
                                {post.productName}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {post.description}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                {post?.createdBy?.profilepic ? (
                                    <img
                                        src={post.createdBy.profilepic}
                                        alt={post.createdBy.username}
                                        className=" bottom-2 left-2 w-10 h-10 object-cover rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                                    />
                                ) : (
                                    <FaUserCircle className="absolute bottom-2 left-2 w-10 h-10 text-gray-400 dark:text-gray-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm" />
                                )}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    By {post?.createdBy?.username || "Anonymous"}
                                </span>
                            
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;