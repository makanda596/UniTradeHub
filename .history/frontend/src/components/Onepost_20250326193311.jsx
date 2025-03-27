import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Posts = () => {
  const [post, setPost] = useState(null); // Use null for a single post
  const {postId}= useParams()

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
  }, []); // Added dependency array to prevent infinite requests

  return (
    <div className="p-4">
      <div className="grid grid-cols-2">
        <h1>images</h1>
        <div>
      <h2 className="text-xl font-bold">Post Details</h2>
      {post ? (
        <div className="border p-4 rounded-lg shadow">
          <img src={post.image} alt=''/>
          <h3 className="text-lg font-semibold">{post.productName}</h3>
          <p>{post.description}</p>
          <p className="text-gray-500">Category: {post.category}</p>

          {/* Display Images if Available */}
          {post.images && post.images.length > 0 && (
            <div className="flex flex-wrap mt-2">
              {post.images.map((image, index) => (
                <img key={index} src={image} alt={`Post ${index}`} className="w-32 h-32 object-cover m-1 rounded-md" />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>Loading post...</p>
      )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
