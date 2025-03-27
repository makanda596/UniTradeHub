import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion"; // For smooth animations

const Reviewspage = ({ user }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchReview = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized: Please log in to view reviews.");
                return;
            }

            const response = await axios.get(`http://localhost:5000/reviews/getReview/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setReviews(response.data);
        } catch (error) {
            setError("Failed to fetch reviews. Please try again later.");
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReview();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 to-gray-100">
            <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 tracking-wide">
                💬 User Reviews
            </h2>

            {error && (
                <p className="text-red-600 text-center bg-red-100 p-3 rounded-md shadow-md">
                    {error}
                </p>
            )}

            {loading ? (
                // 🌀 Animated Skeleton Loader
                <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="p-5 bg-gray-200 rounded-lg shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                                <div className="w-40 h-4 bg-gray-400 rounded"></div>
                            </div>
                            <div className="mt-3 w-full h-5 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center text-gray-500 italic">
                    No reviews yet. Be the first to leave a review! 🚀
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="p-5 border-l-4 border-blue-400 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <FaUserCircle size={40} className="text-blue-500" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Anonymous User</h3>
                                    <p className="text-sm text-gray-500">{new Date(review?.createdAt).toDateString()}</p>
                                </div>
                            </div>
                            <p className="mt-3 text-gray-800">{review.text}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Leave a Review Button */}
            <div className="flex justify-center mt-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                    ✍️ Leave a Review
                </button>
            </div>
        </div>
    );
};

export default Reviewspage;
