import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../utilis/auth';

const SavePost = () => {
    const { postId } = useParams();
    const { addToCart } = useAuthStore();
    const [error, setError] = useState('');

    const handleSaveClick = async () => {
        try {
            await addToCart(postId);
            setError(''); // Clear previous error on success
        } catch (err) {
            // Check if err has a message property
            const errorMessage = err?.message || 'Post already exists in the cart';
            setError(errorMessage);

            // Optional: clear error after a few seconds
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    return (
        <div className="space-y-2">
            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
                    {error}
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
