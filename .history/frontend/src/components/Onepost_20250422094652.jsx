import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import SavePost from "./SavePost";
import Navbar from "./Navbar";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  
  const fetchPost = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/Onepost/${postId}`);
      setPost(response.data);
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
    <>
    <Navbar/>
    <div className="flex flex-col md:flex-row items-center md:items-start p-8 max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-lg">

      {/* Left Section - Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-96 md:max-w-sm rounded-lg shadow-md object-cover"
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

      <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
        
          <Link to={`/Profile/${post?.createdBy?._id}`} className="flex items-center space-x-4 mb-2 p-4 rounded-lg shadow-md" >
          <img
            src={post?.createdBy?.profilepic || "/default-profile.png"}
            alt="Seller"
            className="w-14 h-14 object-cover rounded-full border"
          />
          <div className="flex flex-col">
            
            <p className="text-lg font-semibold text-gray-800">{post?.createdBy?.username}</p>
          </div>
            </Link>

        <h2 className="text-xl font-bold text-gray-900">{post.productName}</h2>
        <p className="text-gray-600 mt-2 text-md">location:{post?.location || "Location not specified"}</p>

        <div className="flex items-center mt-2">
          <Link to='/' className="ml-2 text-gray-600 text-sm">{post?.reviews || "No reviews yet"}</Link>
        </div> 

        <p className="text-gray-700 mt-4 leading-relaxed">{post?.description || "No description available."}</p>

        <div className="flex space-x-2 mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg shadow-md transition duration-300">
              <Link to={`/Chart/${post?.createdBy?._id}`}>Contact Seller</Link>
          </button>
            <SavePost />

        </div>
      </div>
    </div>
    <RelatedProducts />
    </>
  );
};

export default PostPage;
