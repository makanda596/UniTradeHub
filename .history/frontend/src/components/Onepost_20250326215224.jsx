import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts/Onepost/${postId}`);
      setPost(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-8 max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-lg">

      {/* Left Section - Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <img
          src={post.image}
          alt="Post"
          className="w-full md:max-w-sm rounded-lg shadow-md object-cover"
        />
        <div className="flex space-x-3 mt-4">
          {[post.image, post.image, post.image].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 rounded-md border cursor-pointer hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>

      {/* Right Section - Post Details */}
      <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
        {/* Seller Profile */}
        <div className="flex items-center space-x-4 mb-2 p-4 rounded-lg shadow-md">
          <img
            src={post?.createdBy?.profilepic || "/default-profile.png"}
            alt="Seller"
            className="w-14 h-14 object-cover rounded-full border"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-gray-800">{post?.createdBy?.username}</p>
            <p className="text-blue-500">{post?.createdBy?.phoneNumber || "No contact available"}</p>
          </div>
        </div>

        {/* Product Details */}
        <h2 className="text-3xl font-bold text-gray-900">{post.productName}</h2>
        <p className="text-gray-600 mt-2 text-lg">{post?.location || "Location not specified"}</p>

        {/* Reviews */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 text-xl">★★★★★</span>
          <span className="ml-2 text-gray-600 text-sm">{post?.reviews || "No reviews yet"}</span>
        </div>

        {/* Pricing */}
        <p className="text-4xl font-bold text-green-600 mt-4">${post?.price || "N/A"}</p>

        {/* Description */}
        <p className="text-gray-700 mt-4 leading-relaxed">{post?.description || "No description available."}</p>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300">
            Contact Seller
          </button>
          <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
