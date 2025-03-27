import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { postId } = useParams();
  const [posts, setPosts] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // Example: 10 min countdown

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/Onepost/${postId}`);
        setPosts(response.data);
        setSelectedImage(response.data.image);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [postId]);

  // Countdown Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format Time for Display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!posts) return <p className="text-center text-gray-500">Loading product...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md">
      {/* Product Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Product Images */}
        <div className="flex flex-col items-center">
          <img src={selectedImage} alt="Product" className="w-full h-72 object-cover rounded-md shadow-lg" />

          {/* Thumbnails */}
          <div className="flex mt-4 space-x-2">
            {posts.images.map((post, index) => (
              <img
                key={index}
                src={post.img}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${selectedImage === post.image ? "border-red-500" : "border-gray-300"
                  }`}
                onClick={() => setSelectedImage(img)}
              />
                </div>
        </div>
            ))}
        

        {/* Right Side - Product Details */}
        <div>
          <h2 className="text-2xl font-semibold">{post.name}</h2>
          <p className="text-red-600 text-lg font-bold">{post.rating} ⭐ ({post.reviews} reviews)</p>

          {/* Flash Sale Section */}
          <div className="bg-red-500 text-white px-4 py-2 mt-3 rounded-md flex justify-between items-center">
            <span className="font-bold">Flash Sales</span>
            <span className="bg-black px-2 py-1 rounded-md">{formatTime(timeLeft)}</span>
          </div>

          {/* Price & Discount */}
          <div className="mt-4 text-xl font-bold">
            <span className="text-red-600">KSh {post.name}</span>
            <span className="line-through text-gray-500 ml-2">KSh {post.originalPrice}</span>
            <span className="text-green-600 ml-2">{post.discount}% off</span>
          </div>

          {/* Product Options */}
          <div className="mt-4">
            <p className="text-gray-700">Color: <span className="font-semibold">{post.color}</span></p>
            <p className="text-gray-700">Size: <span className="font-semibold">{post.size}</span></p>
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
