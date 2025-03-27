import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Post = ({ user, onClose }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const createPost = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      Swal.fire("Error", "User not found. Please log in again.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Debugging: Log FormData content
    }

    try {
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
      setPreview(null);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire("Error", error.response?.data?.error || "Failed to create post.", "error");
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="p-6 rounded-lg bg-gray-300 shadow-lg w-96 max-w-lg relative">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
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
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block">Category</label>
            <select
              className="w-full px-2 py-1 border rounded text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="furniture">Furniture</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion & Clothing">Fashion & Clothing</option>
              <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
              <option value="Gas Supply">Gas Supply</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-2 py-1 border rounded-md"
            />
            {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
