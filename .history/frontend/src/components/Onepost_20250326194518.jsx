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
  }, [postId]);

  return (
    <div className="px-40">
      {post ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-200 p-4 rounded-lg shadow-md items-center">

          {/* 🔹 First Section - Images */}
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow w-1/4 h-full">
            <h2 className="text-lg font-semibold mb-2">Post Images</h2>
            {post.images && post.images.length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post ${index}`}
                    className="w-32 h-32 object-cover m-1 rounded-md"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>

          {/* 🔹 Second Section - Post Details */}
          <div className="bg-white p-4 rounded-lg shadow w-full h-full flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-2">Post Details</h2>
            <h3 className="text-base font-medium">{post.productName}</h3>
            <p className="text-gray-700 text-sm">{post.description}</p>
            <p className="text-gray-500 mt-1 text-sm">
              <span className="font-medium">Category:</span> {post.category}
            </p>
          </div>

        </div>
      ) : (
        <p className="text-center text-gray-500">Loading post...</p>
      )}
    </div>
  );
};

export default Posts;
