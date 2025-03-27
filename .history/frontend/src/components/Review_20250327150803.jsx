import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const ReviewForm = ({ recieverId }) => {
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                Swal.fire("Unauthorized", "Please log in to submit a review.", "error");
                return;
            }

            const response = await fetch(`http://localhost:5000/reviews/postReview/${recieverId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire("Success", "Review posted successfully!", "success");
                setText("");
            } else {
                Swal.fire("Error", data.message, "error");
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Leave a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700"
                    rows="5"
                    placeholder="Write your review here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
