import React, { useState } from "react";
import axios from "axios";

const Post = ({ user, onClose }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/posts/createpost/${user._id}`, {
        productName,
        description,
      });

      console.log(response.data);
      alert("Post created successfully!");
      setProductName("");
      setDescription("");
      onClose(); // Close form after successful submission
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error.response?.data?.error || "Failed to create post. Please try again.");
    }
  };

  return (
    <div className=" fixed inset-0 flex items-center justify-center ">  
    <div className=" p-6 rounded-lg bg-gray-400 shadow-lg w-96 max-w-lg relative">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>

        {/* Close Button */}
        <button
          onClick={() => {
            console.log("Close button clicked");
            onClose(); // Ensure this function is being called
          }}
          className="absolute top-2 right-2 text-gray-200 hover:text-gray-800 text-2xl"
        >
          ✖
        </button>

        <form onSubmit={createPost}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Product Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                console.log("Cancel button clicked");
                onClose(); // Ensure onClose is working
              }}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
