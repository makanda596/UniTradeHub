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
    setIsOpen(false); // Close modal
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Open Popup Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        ➕ Write a Review
      </button>

      {/* Review Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

            <textarea
              className="w-full p-2 border rounded-md resize-none"
              rows="4"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
