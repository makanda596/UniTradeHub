import React, { useState } from "react";
import axios from "axios";

const Review = ({ followedId, onClose }) => {
    const [reviewText, setReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reviewText.trim()) {
            setError("Please write a review");
            return;
        }

        setIsSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please log in to submit a review");
                return;
            }

            const response = await axios.post(
                `http://localhost:5000/reviews/postReview/${followedId}`,
                {
                    text: reviewText
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setReviewText("");
                setSuccess("Review submitted successfully!");
                setTimeout(() => {
                    onClose();
                    window.location.reload(); // Refresh to show new review
                }, 1500);
            } else {
                setError(response.data.message || "Failed to submit review");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center  z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
                >
                    ✖
                </button>
                <h3 className="text-lg font-semibold mb-4 text-center">Write a Review</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting || !reviewText.trim()}
                        className={`w-full mt-4 py-2 px-4 rounded-lg text-white font-medium ${isSubmitting || !reviewText.trim()
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Review;