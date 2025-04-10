import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const SavePost = () => {
    const {postId} = useParams()
    const [error,setError]= useState("")
    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/carts/addCart/${postId}`, // correct URL
                {}, // no body data
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            console.log(postId);
            console.log(token);
        } catch (error) {
            setError("post already exist in the cart")
            console.error("Error saving post:", error.response?.data || error.message);
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
