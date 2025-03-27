import React, { useState } from "react";

const Review = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [reviewText, setReviewText] = useState("");

    const handleSubmit = () => {
        if (!reviewText.trim()) {
            alert("Review cannot be empty!");
            return;
        }
        console.log("Submitted Review:", reviewText);
        setReviewText(""); // Clear input after submitting
        setIsOpen(false); // Close popup
    };

    return (
        <div className="p-6 text-center">
            {/* Button to Open Popup */}
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => setIsOpen(true)}
            >
                ➕ Write a Review
            </button>

            {/* Review Popup */}
            {isOpen && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg w-80 border">
                    <h2 className="text-lg font-semibold mb-2">Write a Review</h2>
                    <textarea
                        className="w-full p-2 border rounded-md resize-none"
                        rows="4"
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between mt-3">
                        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => setIsOpen(false)}>
                            Cancel
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Review;
