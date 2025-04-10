import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const SavePost = () => {
    const {postId} = useParams()
    const [error,setError]= useState("")
    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem("token");
  await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/carts/addCart/${postId}`, // correct URL
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
               
            );
            window.location.reload()
    
        } catch (error) {
            setError("post already exist in the cart",error)
         
        }
    };

    return (
        <div>
            <p className="text-red-500">{error}</p>
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
