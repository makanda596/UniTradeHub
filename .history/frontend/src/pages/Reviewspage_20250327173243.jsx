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
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">User Reviews</h2>

            {error && (
                <p className="text-red-500 text-center bg-red-100 p-2 rounded-md">{error}</p>
            )}

            {loading ? (
                // Skeleton Loader for better UX while fetching data
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-md bg-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                            </div>
                            <div className="mt-2 w-full h-5 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500 text-center">No reviews yet. Be the first to review!</p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="flex items-center gap-3">
                                <FaUserCircle size={36} className="text-gray-600" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Anonymous User</h3>
                                    <p className="text-sm text-gray-500">{new Date(review?.createdAt).toDateString()}</p>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-700">{review.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviewspage;
