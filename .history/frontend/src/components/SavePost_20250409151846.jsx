import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';

const SavePost = () => {
    const { postId } = useParams()
    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/carts/addCart/${postId}`, postId, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.data)
            console.log(postId)
            console.log(token)
        } catch (error) {
            console.log(error.message)
        }
    };
  return (
    <div>
          <button
              onClick={ handleSaveClick}
              className="bg-red-500 text-white w-full px-4 py-1 rounded-md hover:bg-red-600 transition duration-200 text-sm font-semibold"
          >
              Save Post
          </button>
    </div>
  )
}

export default SavePost