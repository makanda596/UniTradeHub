import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Post = ({ user, onClose }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const createPost = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      Swal.fire("Error", "User not found. Please log in again.", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("description", description);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `http://localhost:5000/posts/createpost/${user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response.data);
      Swal.fire("Success", "Post created successfully!", "success");

      setProductName("");
      setDescription("");
      setCategory("");
      setImage(null);
      onClose(); // Close form after submission
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire("Error", error.response?.data?.error || "Failed to create post. Please try again.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="p-6 rounded-lg bg-gray-300 shadow-lg w-96 max-w-lg relative">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>

        <button
          onClick={() => onClose()}
          className="absolute top-2 right-2 text-gray-200 hover:text-gray-800 text-2xl"
        >
          ✖
        </button>

        <form onSubmit={createPost}>
          <div className="mb-4 text-blue-600">
            <label className="block text-sm font-medium mb-1">Product Name:</label>
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

          <div className="mb-4">
            <label className="block">Category</label>
            <select
              className="w-full px-2 py-1 border rounded mt-0 text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="furniture">Furniture</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Home">Home</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion & Clothing">Fashion & Clothing</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Salon">Salon</option>
              <option value="beauty&cosmetics">Beauty & Cosmetics</option>
              <option value="Gas Supply">Gas Supply</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => onClose()}
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