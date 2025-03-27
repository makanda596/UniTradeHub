import React, { useState } from "react";
import axios from 'axios'
const CreatePost = ({ user }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // Store multiple images
  const [imagePreviews, setImagePreviews] = useState([]); // Previews for display
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Get selected files

    if (files.length === 0) {
      setError("Please select at least one image.");
      return;
    }

    setImages((prev) => [...prev, ...files]); // Allow multiple images

    // Generate previews for all selected images
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    setError(""); // Reset error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("User not found. Please log in.");
      return;
    }

    if (!productName || !description || !category) {
      alert("All fields are required.");
      return;
    }

    if (images.length === 0) {
      setError("Please select at least one image.");
      return;
    }

    setLoading(true);

    try {
      const postData = {
        productName,
        description,
        category,
        images,
      };

      await axios.post(`http://localhost:5000/posts/createpost/${user._id}`, postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post created successfully! ✅");

      // Reset form
      setProductName("");
      setDescription("");
      setCategory("");
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Image Previews */}
          <div className="flex flex-wrap mt-2">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index}`} className="w-24 h-24 object-cover m-1 rounded-md" />
            ))}
          </div>
        </div>

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
