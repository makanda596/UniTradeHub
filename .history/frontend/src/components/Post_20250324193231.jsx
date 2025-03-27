import React, { useState } from "react";
import axios from "axios";

const CreatePost = ({ user }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(URL.createObjectURL(file));
      };
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/image/upload", { image });
      setImage(response.data.imageUrl);
      setLoading(false);
      alert("Image uploaded successfully! ✅");
    } catch (err) {
      setLoading(false);
      setError("Image upload failed. Please try again.");
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
      await axios.post(`http://localhost:5000/posts/createpost/${user._id}`, {
        productName,
        description,
        category,
        image,
      });
      alert("Post created successfully! ✅");
      setProductName("");
      setDescription("");
      setCategory("");
      setImage(null);
      setPreview(null);
    } catch (error) {
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

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="w-40 h-40 mt-2 object-cover" />}
        <button type="button" onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded-md mt-2">
          {loading ? "Uploading..." : "Upload Image"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md" disabled={loading}>
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
