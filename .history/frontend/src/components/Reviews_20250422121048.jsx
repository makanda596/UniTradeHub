import React, { useEffect } from 'react';
import { FaStar, FaUserCircle, FaRegCommentDots } from 'react-icons/fa';
import { useAuthStore } from '../utilis/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { ImSpinner8 } from 'react-icons/im';

const Reviews = ({ userId }) => {
    const { fetchReviews, reviews, isFetchingReviews, reviewError } = useAuthStore();

    useEffect(() => {
        if (userId) fetchReviews(userId);
    }, [userId]);

    if (!userId) return (
        <div className="text-gray-500 text-center p-8">
            User ID not available
        </div>
    );

    return (
        <section id="reviews" className="max-w-4xl mx-auto py-8 px-4">
            <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-8 text-gray-800 dark:text-white flex items-center gap-3"
            >
                <FaRegCommentDots className="text-purple-500" />
                Customer Feedback
            </motion.h2>

            {isFetchingReviews ? (
                <div className="flex justify-center items-center py-12">
                    <ImSpinner8 className="animate-spin text-3xl text-purple-600" />
                </div>
            ) : reviewError ? (
                <div className="text-center py-8 text-red-500">
                    Failed to load reviews. 
                    <button 
                        onClick={() => fetchReviews(userId)}
                        className="ml-2 text-purple-600 hover:underline"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <AnimatePresence>
                    {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <motion.div
                                    key={review._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="relative">
                                            {review.senderId?.profilepic ? (
                                                <img
                                                    src={review.senderId.profilepic}
                                                    alt={review.senderId.username}
                                                    className="w-14 h-14 rounded-full object-cover border-3 border-purple-100 dark:border-gray-700 hover:border-purple-300 transition-all duration-300"
                                                />
                                            ) : (
                                                <FaUserCircle className="w-14 h-14 text-gray-400 dark:text-gray-600" />
                                            )}
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                                        {review.senderId?.username || 'Anonymous Buyer'}
                                                    </h3>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className={`w-5 h-5 ${
                                                                    i < (review.rating || 0)
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-300 dark:text-gray-600'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <p className="mt-4 text-gray-600 dark:text-gray-300 pl-2 border-l-4 border-purple-100 dark:border-gray-700 italic">
                                                "{review.text}"
                                            </p>

                                            {review.image && (
                                                <div className="mt-6 grid grid-cols-2 gap-4">
                                                    <div className="relative aspect-square rounded-xl overflow-hidden cursor-zoom-in">
                                                        <img
                                                            src={review.image}
                                                            alt="Review"
                                                            className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="max-w-md mx-auto">
                                <div className="mb-6 text-6xl text-gray-300 dark:text-gray-600">
                                    <FaRegCommentDots />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                    No Reviews Yet
                                </h3>
                                <p className="text-gray-400 dark:text-gray-500">
                                    Be the first to share your experience!
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </section>
    );
};

export default Reviews;