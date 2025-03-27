import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreatePost = ({ user }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      Swal.fire("Error", "User not found. Please log in again.", "error");
      return;
    }

    if (!productName || !description || !category || !image) {
      Swal.fire("Error", "All fields are required!", "warning");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image); // Attach image file

    try {
      const response = await axios.post(
        `http://localhost:5000/posts/createpost/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire("Success", "Post created successfully!", "success");

      // Clear form
      setProductName("");
      setDescription("");
      setCategory("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire(
        "Error",
        error.response?.data?.error || "Failed to create post.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded-md"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded-md"
          onChange={handleImageChange}
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-md mt-2"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
