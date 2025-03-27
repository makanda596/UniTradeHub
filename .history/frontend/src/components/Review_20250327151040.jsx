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

    const openReviewPopup = () => {
        Swal.fire({
            title: "Leave a Review",
            html: `<textarea id="review-text" class="swal2-textarea" placeholder="Write your review here..."></textarea>`,
            showCancelButton: true,
            confirmButtonText: "Submit",
            preConfirm: () => {
                const reviewText = document.getElementById("review-text").value;
                if (!reviewText) {
                    Swal.showValidationMessage("Please enter a review");
                }
                return reviewText;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setText(result.value);
                handleSubmit(new Event("submit"));
            }
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white text-center">
            <button
                onClick={openReviewPopup}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Leave a Review
            </button>
        </div>
    );
};

export default ReviewForm;
