import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../utilis/auth';

const SavePost = () => {
    const { postId } = useParams();
    const { addToCart } = useAuthStore();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSaveClick = async () => {
        try {
            await addToCart(postId);
            setError('');
            setSuccess('Post saved to cart successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            // Optional: Log the raw error
            console.error(err);

            if (err.response?.status === 409) {
                setError('This post is already in your cart.');
            } else {
                setError(err.message || 'Something went wrong. Please try again.');
            }

            setTimeout(() => setError(''), 4000);
        }
    };

    return (
        <div className="space-y-2">
            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
                    {success}
                </div>
            )}
            <button
                onClick={handleSaveClick}
                className="bg-green-500 text-white w-40 px-4 py-1 rounded-md hover:bg-blue-600 transition duration-200 text-sm font-semibold"
            >
                Save Post
            </button>
        </div>
    );
};

export default SavePost;
