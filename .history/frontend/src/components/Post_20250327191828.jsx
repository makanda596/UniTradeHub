import axios from 'axios';
import React, { useState } from "react";
import { FaTimes, FaUpload, FaSpinner, FaCheck, FaTag, FaAlignLeft } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";

const CreatePost = ({ user, onClose, onPostCreated }) => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    location: ""
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const categories = [
    "Electronics",
    "Fashion & Clothing",
    "Gas Supply",
    "Home",
    "Kitchen",
    "Furniture",
    "Beauty & Cosmetics",
    "Food & Beverages",
    "Salon",
    "Others"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateAndSetImage(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    validateAndSetImage(file);
  };

  const validateAndSetImage = (file) => {
    setError("");

    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!image) {
      setError("Please upload an image of your product");
      return;
    }

    if (!user?._id) {
      setError("Please log in to create a post");
      return;
    }

    if (!formData.productName || !formData.description || !formData.category) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const postData = {
        ...formData,
        image,
        userId: user._id
      };

      const response = await axios.post(
        `http://localhost:5000/posts/createpost/${user._id}`,
        postData
      );

      setSuccess("Post created successfully!");

      // Reset form
      setFormData({
        productName: "",
        description: "",
        category: "",
        price: "",
        location: ""
      });
      setImage(null);

      // Callback if provided
      if (onPostCreated) {
        onPostCreated(response.data);
      }

      // Auto-close after success if needed
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.response?.data?.message || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Create New Listing</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            disabled={loading}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <IoMdImages className="mr-2 text-blue-500" />
              Product Images
            </label>
            <div
              className={`flex items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
                ${image ? 'p-0' : 'p-4'}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                  <p className="text-sm text-gray-500">
                    {isDragging ? 'Drop image here' : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">JPEG, PNG (Max 5MB)</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
            </div>
            <label
              htmlFor="image-upload"
              className="block text-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Click to select file
            </label>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaTag className="mr-2 text-blue-500" />
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              placeholder="What are you offering?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaAlignLeft className="mr-2 text-blue-500" />
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your product in detail..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price (KSh)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={formData.price}
              onChange={handleChange}
              min="0"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Where is this available?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <MdOutlineCategory className="mr-2 text-blue-500" />
              Category
            </label>
            <select
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-2">{error}</div>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm flex items-start">
              <div className="flex-shrink-0">
                <FaCheck className="h-4 w-4" />
              </div>
              <div className="ml-2">{success}</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors flex items-center justify-center
                ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create Listing'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;