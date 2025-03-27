import React, { useState } from "react";
import axios from "axios";

const CreatePost = ({ user }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("User not found. Please log in.");
      return;
    }

    if (!productName || !description || !category || !image) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);

      await axios.post(
        `http://localhost:5000/posts/createpost/${user._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Post created successfully! ✅");

      // Reset form
      setProductName("");
      setDescription("");
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
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

        <select
          className="w-full p-2 border rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion & Clothing">Fashion & Clothing</option>
          <option value="Gas Supply">Gas Supply</option>
          <option value="Home">Home</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Furniture">Furniture</option>
          <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
          <option value="Food & Beverages">Food & Beverages</option>
          <option value="Salon">Salon</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-md"
        />

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
