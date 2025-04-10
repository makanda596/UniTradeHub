import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const SavePost = () => {
    const {postId} = useParams()
    const [error,setError]= useState("")
    const handleSaveClick = async (postId) => { // Add postId as parameter
        try {
            setError(""); // Clear previous errors
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please log in to save items");
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/carts/addCart/${postId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                // Success handling
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart!',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            // Handle different error types
            const errorMessage = error.response?.data?.message ||
                error.message ||
                "Failed to add to cart";

            // Specific error messages
            if (error.response?.status === 409) { // Conflict
                setError("Item already in cart");
            } else if (error.response?.status === 404) { // Not Found
                setError("Product not found");
            } else if (error.response?.status === 401) { // Unauthorized
                setError("Session expired - please log in again");
            } else {
                setError(errorMessage);
            }

            console.error("Save Error:", {
                error: error.response?.data || error.message,
                postId,
                endpoint: `${import.meta.env.VITE_BACKEND_URL}/carts/addCart/${postId}`
            });
        }
    };

    return (
        <div>
            <>{error}</>
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
