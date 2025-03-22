import React, { useState } from "react";
import axios from "axios";

function App({ user }) {
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
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error.response?.data?.error || "Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Post Management</h1>

        {user ? <h1>{user.email}</h1> : <p>No email</p>}

        <form onSubmit={createPost} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>

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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
