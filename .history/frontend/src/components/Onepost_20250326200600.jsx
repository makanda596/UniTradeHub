import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Posts = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts/Onepost/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]); // Include postId to refetch when it changes

  return (
    <div className="p-4">
      {post ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap- bg-gray-200 p-6 rounded-lg shadow-md w-full py-10">

          {/* 🔹 First Section - Images */}
          <div className="flex flex-wrap justify-center items-center bg-white p-4 rounded-lg shadow w-1/4">
            <h2 className="text-xl font-bold mb-2 w-1/4 text-center">Post Images</h2>
            {post.images && post.images.length > 0 ? (
              post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post ${index}`}
                  className="w-40 h-40 object-cover m-2 rounded-md"
                />
              ))
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>

          {/* 🔹 Second Section - Post Details */}
          <div className="bg-white p-6 rounded-lg shadow w-">
            <h2 className="text-xl font-bold mb-4">Post Details</h2>
            <h3 className="text-lg font-semibold">{post.productName}</h3>
            <p className="text-gray-700">{post.description}</p>
            <p className="text-gray-500 mt-2">Category: <span className="font-medium">{post.category}</span></p>
          </div>

        </div>
      ) : (
        <p className="text-center text-gray-500">Loading post...</p>
      )}
    </div>
  );
};

export default Posts;
