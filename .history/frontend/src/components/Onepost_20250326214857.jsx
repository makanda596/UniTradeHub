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
      console.log(response.data.createdBy);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [postId]);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 max-w-5xl mx-auto">
    
          <div className="w-full md:w-1/2 flex flex-col items-center" >
            <img
              src={posts.image}
              alt="Post"
              className="w-full md:max-w-sm rounded-lg shadow-md"
            />
        <div className="flex space-x-2 mt-4">
          <img
            src={posts.image}
            alt="Thumbnail"
            className="w-16 h-16 rounded-md border cursor-pointer"
          />
          <img
            src={posts.image}
            alt="Thumbnail"
            className="w-16 h-16 rounded-md border cursor-pointer"
          /><img
            src={posts.image}
            alt="Thumbnail"
            className="w-16 h-16 rounded-md border cursor-pointer"
          />
        </div>
        
          </div>
      
      
      {/* Right Section - Post Details */}
      <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0">
      <div className="flex flex-row gap-4">
        <img src={posts?.createdBy?.profilepic} alt="" className="w-14 h-14 object-cover " />
        <div className="flex flex-col">
          <p className="text-lg font-semibold ">{posts?.createdBy?.username}</p>
          <p className="text-blue-600 font-sans">{posts?.createdBy?.phoneNumber || "no phone Number "}</p>
          </div>
      </div>
        <h2 className="text-2xl font-semibold">{posts.productName}</h2>
        <div className="flex items-center mt-2">
          {/* <span className="text-yellow-400 text-lg">★★★★★</span> */}
          <span className="ml-2 text-gray-600">{posts?.reviews || "no reviews yet"}</span>
        </div>
        <p className="text-3xl font-bold mt-4">$72</p>
        <p className="text-gray-600 mt-4"> {posts?.description || "no description yet"}
        </p>
        <h2>{posts?.location || "no location"}</h2>

  

        <button className="mt-6 bg-black text-white px-6 py-3 rounded-md w-48">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PostPage;
