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
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Leave a Review</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Write your review..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <button
                    type="submit"
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;