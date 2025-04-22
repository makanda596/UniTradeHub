import React, { useEffect } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import { useAuthStore } from '../utilis/auth';

const Reviews = ({ userId }) => {
    // const [reviews, setReviews] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');

    const { fetchReviews ,reviews}=useAuthStore()    

    useEffect(() => {
       fetchReviews();
    }, [userId]);

    if (!userId) return <div className="text-gray-500">User ID not provided</div>;

    return (
        <section id="reviews" className="max-w-3xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                User Reviews
            </h2>

           {reviews.lenght > 0 ?
                (<div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <div className="flex items-start gap-4 mb-4">
                                {review.senderId?.profilepic ? (
                                    <img
                                        src={review.senderId.profilepic}
                                        alt={review.senderId.username}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                                    />
                                ) : (
                                    <FaUserCircle className="w-12 h-12 text-gray-400" />
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-white">
                                        {review.senderId?.username || 'Anonymous'}
                                    </h3>
                                   
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 pl-2">
                                {review.text}
                            </p>
                            {review.image && (
                                <img
                                    src={review.image}
                                    alt="Review"
                                    className="mt-4 rounded-lg max-w-xs object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
               
            ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No reviews yet
                </div>
            )}
        </section>
    );
};

export default Reviews;