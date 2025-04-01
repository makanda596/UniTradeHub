import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ receiverId }) => {
    const [reviewText, setReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reviewText.trim()) {
            setError("Please write a review");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please log in to submit a review");
                return;
            }

            const response = await axios.post(
                `http://localhost:5000/reviews/postReview/${receiverId}`,
                { text: reviewText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setReviewText("");
                alert("Review submitted successfully!");
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
        <div className="max-w-md mx-auto p-4  rounded-lg shadow fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h3 className="text-lg font-medium mb-3">Write a Review</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    rows="4"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;