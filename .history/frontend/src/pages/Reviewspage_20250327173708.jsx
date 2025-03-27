import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

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
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6"> Customers  Reviews</h2>

            {error && (
                <p className="text-red-600 text-center bg-red-100 p-3 rounded-md shadow-md">
                    {error}
                </p>
            )}

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="p-2 bg-gray-200 rounded-lg shadow-lg animate-pulse">
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
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="p-2 border-l-4 border-blue-400 bg-gray-50 shadow-md rounded-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="flex items-center gap-4">
                                <FaUserCircle size={40} className="text-blue-500" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Anonymous User</h3>
                                    <p className="text-sm text-gray-500">{new Date(review?.createdAt).toDateString()}</p>
                                </div>
                            </div>
                            <p className="mt-3 text-gray-700">{review.text}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    ✍️ Leave a Review
                </button>
            </div>
        </div>
    );
};

export default Reviewspage;
