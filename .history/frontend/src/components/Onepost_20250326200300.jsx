import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { postId } = useParams(); // Fetch post ID from URL
  const [post, setPost] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10-minute countdown

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/Onepost/${postId}`);
        setPost(response.data);
        setSelectedImage(response.data.image); // Set initial selected image
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  // Countdown Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!post) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Images */}

      

        {/* Right Side - Post Details */}
        <div>
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p className="text-red-600 text-lg font-bold">{post.rating} ⭐ ({post.reviews} reviews)</p>

          {/* Flash Sale Countdown */}
          <div className="bg-red-500 text-white px-4 py-2 mt-3 rounded-md flex justify-between items-center">
            <span className="font-bold">Flash Sale</span>
            <span className="bg-black px-2 py-1 rounded-md">{formatTime(timeLeft)}</span>
          </div>

          {/* Price & Discount */}
          <div className="mt-4 text-xl font-bold">
            <span className="text-red-600">KSh {post.price}</span>
            <span className="line-through text-gray-500 ml-2">KSh {post.originalPrice}</span>
            <span className="text-green-600 ml-2">{post.discount}% off</span>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center">
            <p className="mr-3">Quantity:</p>
            <button className="bg-gray-300 px-3 py-1 rounded-md">-</button>
            <span className="mx-2">1</span>
            <button className="bg-gray-300 px-3 py-1 rounded-md">+</button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold">Add to Cart</button>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
