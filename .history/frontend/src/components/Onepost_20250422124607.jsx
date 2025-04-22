import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import SavePost from "./SavePost";
import Navbar from "./Navbar";
import Reviews from "./Reviews";

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
    <div className="flex flex-col md:flex-row items-center md:items-start py-14 px-6 max-w-6xl mx-auto  ">

      <div className="w-full md:w-1/2 flex flex-col items-center">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-96  rounded-lg shadow-md object-cover"
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

      <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-4">
        
          <Link to={`/Profile/${post?.createdBy?._id}`} className="flex items-center space-x-4 mb-2 p-2 rounded-lg shadow-md" >
          <img
            src={post?.createdBy?.profilepic || "/default-profile.png"}
            alt="Seller"
            className="w-14 h-14 object-cover rounded-full border"
          />
          <div className="flex flex-col">
            
            <p className="text-lg font-semibold text-gray-800">{post?.createdBy?.username}</p>
          </div>
            </Link>

          <h2 className="text-lg font-bold text-gray-900">{post.productName}</h2>
          <p className="text-gray-600 mt-0 text-md"><span className="text-blue-600">location:</span>{post?.location || "Location not specified"}</p>

       
        <p className="text-gray-700 mt-4 leading-relaxed">{post?.description || "No description available."}</p>

        <div className="flex space-x-2 mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0 rounded-lg shadow-md transition duration-300">
              <a href={`/Chart/${post?.createdBy?._id}`}>Contact Seller</a>
          </button>
            <SavePost />
            <a href='#reviews' className=" text-black px-2 rounded-lg font-semibold text-sm bg-gray-200">Reviews</a>

        </div>
      </div>
    </div>
      <RelatedProducts category={post.category} currentPostId={post._id} />

        <Reviews userId={post?.createdBy?._id }/>
    </>
  );
};

export default PostPage;
