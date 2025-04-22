import React, { useEffect, useState } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import { useAuthStore } from '../utilis/auth';

const Reviews = ({ userId }) => {
    const { fetchReviews, reviews } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadReviews = async () => {
            setIsLoading(true);
            setError(null);
            try {
                await fetchReviews(userId);
            } catch (err) {
                setError('Failed to load reviews.');
                console.error('Error fetching reviews:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            loadReviews();
        } else {
            setIsLoading(false);
        }
    }, [userId, fetchReviews]);

    if (!userId) {
        return (
            <div className="text-gray-500 dark:text-gray-400 py-8 text-center">
                User ID not provided.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto py-8 text-center text-gray-600 dark:text-gray-300">
                Loading reviews...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto py-8 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <section id="reviews" className="max-w-3xl mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    User Reviews
                </h2>
                {reviews.length > 0 && (
                    <div className="flex items-center space-x-2">
                        <FaStar className="text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {/* You might want to calculate an average rating here */}
                            {/* Example: {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)} average */}
                            {reviews.length} Reviews
                        </span>
                    </div>
                )}
            </div>

            {reviews.length > 0 ? (
                <div className="space-y-8">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                {review.senderId?.profilepic ? (
                                    <img
                                        src={review.senderId.profilepic}
                                        alt={review.senderId.username}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 dark:border-purple-700"
                                    />
                                ) : (
                                    <FaUserCircle className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                                )}
                                <div className="flex flex-col space-y-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {review.senderId?.username || 'Anonymous'}
                                    </h3>
                                    {review.createdAt && (
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    )}
                                    {review.rating && (
                                        <div className="flex items-center space-x-1">
                                            {[...Array(review.rating)].map((_, index) => (
                                                <FaStar key={index} className="text-yellow-500 text-sm" />
                                            ))}
                                            {[...Array(5 - review.rating)].map((_, index) => (
                                                <FaStar
                                                    key={`empty-${index}`}
                                                    className="text-gray-300 dark:text-gray-600 text-sm"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {review.text}
                            </p>
                            {review.image && (
                                <div className="mt-4">
                                    <img
                                        src={review.image}
                                        alt="Review Image"
                                        className="rounded-md max-w-full h-auto object-cover shadow-sm"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                    No reviews yet. Be the first to leave a review!
                </div>
            )}
        </section>
    );
};

export default Reviews;