import axios from 'axios';
import React, { useState } from "react";
import { FaTimes, FaUpload, FaSpinner, FaCheck, FaAlignLeft } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";

const CreatePost = ({ onClose, onPostCreated }) => {
  const [formData, setFormData] = useState({
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    validateAndSetImage(file);
  };

  const validateAndSetImage = (file) => {
    setError("");

    if (!file) return;

    if (!file.type.match('image.*')) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

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

    if (!image) {
      setError("Please upload an image of your product");
      return;
    }

    if (!formData.description) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const postData = {
        ...formData,
        image,
      };
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/flash/postFlash`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess("Post created successfully!");
      setFormData({ description: "" });
      setImage(null);

      if (onPostCreated) {
        onPostCreated(response.data);
      }

      window.location.reload();

      setTimeout(() => {
        if (onClose) onClose();
      }, 100);
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.response?.data?.message || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed ml-6 lg:ml-96 inset-0 bg-opacity-100 flex items-center w-96 justify-center p-2 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh]">
        <div className="sticky top-0 bg-white p-2 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-md font-bold text-gray-800">Create</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            disabled={loading}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-2 space-y-2">
          <div className="space-y-1">
            <label className="flex text-sm font-medium text-gray-700 items-center">
              <IoMdImages className="mr-2 text-blue-500" />
              Product Images
            </label>
            <div
              className={`flex items-center justify-center w-full h-30 border-2 border-dashed rounded-xl cursor-pointer transition-all
                ${image ? 'p-0' : 'p-4'} border-gray-300 hover:border-blue-400`}
              onClick={() => document.getElementById('image-upload').click()}
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
                  <p className="text-sm text-gray-500">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">JPEG, PNG (Max 5MB)</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
          </div>

          <div className="space-y-1">
            <label className="flex text-sm font-medium text-gray-700 items-center">
              <FaAlignLeft className="mr-2 text-blue-500" />
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your product in detail..."
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="flex space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-1 px-2 rounded-lg font-medium text-gray-700 bg-gray-400 hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors flex items-center justify-center
                ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
