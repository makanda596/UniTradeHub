import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaStar, FaRegStar, FaRegSmile, FaRegFrown } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import Navbar from "../components/Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const Reviewspage = ({  user }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [averageRating, setAverageRating] = useState(0);

    const fetchReview = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please log in to view reviews");
                setLoading(false);
                return;
            }

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/getUserReview`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setReviews(response.data);
            calculateAverageRating(response.data);
        } catch (error) {
            error("Error fetching reviews:", error);
            
        } finally {
            setLoading(false);
        }
    };

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return;
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        setAverageRating(total / reviews.length);
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            i < Math.floor(rating) ? 
                <FaStar key={i} className="text-yellow-400 inline" /> : 
                <FaRegStar key={i} className="text-yellow-400 inline" />
        ));
    };

    useEffect(() => {
        fetchReview();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar user={user} />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Reviews</h1>
                    <p className="text-gray-600 mb-4">Feedback from your customers</p>
                    
                    {reviews.length > 0 && (
                        <div className="flex items-center">
                            <div className="text-xl font-bold text-gray-800 mr-4">
                                {averageRating.toFixed(1)}
                            </div>
                            <div className="mr-4">
                                {renderStars(averageRating)}
                                <span className="text-sm text-gray-500 ml-2">
                                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                                </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <IoMdTime className="mr-1" />
                                Last updated: {new Date().toLocaleDateString()}
                            </div>
                        </div>
                    )}
                </div>

                {error && !loading && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <FaRegFrown className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {loading && (<LoadingSpinner/>                                )}

                {!loading && reviews.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                        <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaRegSmile className="text-blue-500 text-xl" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No Reviews Yet</h3>
                        <p className="text-gray-500 mb-6">Your customers haven't left any reviews yet.</p>
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                            onClick={() => window.location.reload()}
                        >
                            Check Again
                        </button>
                    </div>
                )}

                {/* Reviews List */}
                {!loading && reviews.length > 0 && (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div 
                                key={review._id} 
                                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-start mb-2">
                                    <FaUserCircle className="text-gray-400 text-4xl mr-4 flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-800">
                                                    {review.user?.username || 'Anonymous User'}
                                                </h3>
                                                <div className="mt-1 hidden">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-3">{review.text}</p>
                                {review.response && (
                                    <div className="bg-blue-50 p-4 rounded-lg mt-4 border-l-4 border-blue-400">
                                        <div className="font-medium text-blue-800 mb-1">Your Response</div>
                                        <p className="text-blue-700">{review.response}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviewspage;