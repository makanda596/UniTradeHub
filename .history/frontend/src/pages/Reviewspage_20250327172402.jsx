import React, { useEffect, useState } from "react";
import axios from "axios";

const Reviewspage = ({user}) => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");

    const fetchReview = async () => {
           try {
               const token = localStorage.getItem("token");
               if (!token) {
                   setError("Unauthorized: Please log in to view review count.");
                   return;
               }
   
               const response = await axios.get("http://localhost:5000/reviews/getReview", {
                   headers: { Authorization: `Bearer ${token}` },
               });
   
               console.log("Review Count Response:", response.data);
               setReviews(response.data);  // Store only the review count
           } catch (error) {
               setError(error.message);
               console.error("Error fetching reviews:", error);
           }
       };
   
      
   
       useEffect(() => {
           fetchReview();
       }, []);
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">User Reviews</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {reviews.length === 0 ? (
                <p className="text-gray-500 text-center">No reviews yet.</p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="p-4 border rounded-lg shadow-md">
                            <div className="flex items-center gap-3">
                                <img
                                    src={review.user.profilePic || "https://via.placeholder.com/50"}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{review.user.username}</h3>
                                    <p className="text-sm text-gray-500">{new Date(review.createdAt).toDateString()}</p>
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
