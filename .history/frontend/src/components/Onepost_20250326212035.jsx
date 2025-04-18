import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [posts, setPosts] = useState([]); // Fixed: Use an array instead of a string
  const { postId } = useParams();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/posts/Onepost/${postId}`
      );
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [postId]);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 max-w-5xl mx-auto">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div className="w-full md:w-1/2 flex flex-col items-center" key={index}>
            <img
              src={post.image}
              alt="Post"
              className="w-full md:max-w-sm rounded-lg shadow-md"
            />
            <div className="flex space-x-2 mt-4">
              <img
                src="/path-to-your-thumbnail.jpg"
                alt="Thumbnail"
                className="w-16 h-16 rounded-md border cursor-pointer"
              />
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      {/* Right Section - Post Details */}
      <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0">
        <h2 className="text-2xl font-semibold">Men Slim Fit Relaxed Denim Jacket</h2>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 text-lg">★★★★★</span>
          <span className="ml-2 text-gray-600">(122 reviews)</span>
        </div>
        <p className="text-3xl font-bold mt-4">$72</p>
        <p className="text-gray-600 mt-4">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer garment.
        </p>

        {/* Select Size */}
        <div className="mt-6">
          <p className="text-lg font-medium">Select Size</p>
          <div className="flex space-x-3 mt-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className="border px-4 py-2 rounded-md hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <button className="mt-6 bg-black text-white px-6 py-3 rounded-md w-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PostPage;
