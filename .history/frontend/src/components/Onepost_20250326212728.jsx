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
      console.log(response.data.productName);
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
                                  <Link to={`/Onepost/${post._id}`}>
                                      <li key={index} className="pl-4  bg-white shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-2">
                                      <div className="flex items-center justify-between">
                                     
                                        <div className="flex items-center gap-4">
                                              <a href={`/Profile/${post?.createdBy?._id}`}>   <img
                                                  src={post?.createdBy?.profilepic || defaultAvatar}
                                                  alt={post?.createdBy?.username}
                                                  className="w-12 h-12 rounded-full border-1 border-gray-300 object-cover"
                                              /></a>
                                              <div>
                                                  <a href={`/Profile/${post?.createdBy?._id}`} className="text-md font-bold text-gray-800 cursor-pointer hover:underline hover:text-blue-600">
                                                      {post?.createdBy?.username || "Unknown"}
                                                  </a>
                                                  <p className="text-xs font-medium text-blue-500">{post?.createdBy?.phoneNumber || "N/A"}</p>
                                                  <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
      
                                              </div>
                                          </div>
                                          <p className="text-sm font-medium text-black pr-2">{post?.category || "N/A"}</p>
      
                                      </div>
      
                                      <div>
                                          <h3 className="text-md font-semibold text-gray-800">{post.productName}</h3>
                                          <p className="text-gray-600">{post.description}</p>
                                      </div>
      
                                      <img src={post.image} alt="Post" className="w-full h-96 object-cover " />
      <div className="border-1 border-gray-400 w-full mb-[-10px]"></div>
                                      <div className="flex justify-between items-center py-1 text-gray-600">
      
                                          <button onClick={() => handleLike(index)} className={`flex items-center gap-1 ${likedPosts[index] ? 'text-blue-600' : ''} transition`}>
                                              <FaThumbsUp />{post.likes || 0} Like
                                          </button>
                                          <button onClick={handleComment} className="flex items-center gap-1 hover:text-blue-600 transition">
                                              <FaComment /> Comment
                                          </button>
                                         
                                          <button
                                              onClick={() => {
                                                  if (post?.createdBy?.phoneNumber) {
                                                      let formattedPhone = post.createdBy.phoneNumber.trim();
      
                                                      // Ensure it starts with country code (+254 for Kenya)
                                                      if (!formattedPhone.startsWith("+")) {
                                                          formattedPhone = "+254" + formattedPhone.slice(-9); // Assume last 9 digits are the valid number
                                                      }
      
                                                      const waLink = `https://wa.me/${formattedPhone}`;
                                                      window.open(waLink, "_blank");
                                                  } else {
                                                      alert("Phone number is not available for this post.");
                                                  }
                                              }}
                                              className="flex items-center text-green-600 transition"
                                          >
                                              <FaWhatsapp /> WhatsApp
                                          </button>
      
                                          <button onClick={() => handleShare(post)} className="flex items-center  hover:text-blue-600 transition">
                                              <FaShare />Share
                                          </button>
                                      </div>
                                  </li></Link>
                              ))
                          ) : (
                              <p className="text-gray-500 text-center text-lg">No posts found.</p>
                          )}
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div className="w-full md:w-1/2 flex flex-col items-center" key={index}>
            <img
              src={post.image}
              alt="Post"
              className="w-full md:max-w-sm rounded-lg shadow-md"
            />
            <p>{post.productName}</p>
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
