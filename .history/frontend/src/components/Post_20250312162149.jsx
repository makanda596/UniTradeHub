import React, { useState, useEffect } from "react";
import axios from "axios";

function App({user}) {
  const [posts, setPosts] = useState([]); // State to store all posts
  const [productName, setProductName] = useState(""); // State for product name input
  const [description, setDescription] = useState(""); // State for description input
  const [userId, setUserId] = useState(""); // State for user ID input

  // Fetch all posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts"); // Replace with your backend URL
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Function to create a new post
  const createPost = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    try {
      const response = await axios.post(`http://localhost:5000/api/users/${userId}/posts`, {
        productName,
        description,
      }); // Replace with your backend URL
      alert("Post created successfully!");
      setProductName(""); // Clear form fields
      setDescription("");
      setUserId("");
      fetchPosts(); // Refresh the list of posts
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Post Management</h1>
{user ?(<h1>{user.email}</h1>) :(<p>no email</p>)}
        {/* Form to create a new post */}
        <form onSubmit={createPost} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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

        {/* Display all posts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Posts</h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold">{post.productName}</h3>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <div className="mt-4 flex items-center">
                  <img
                    src={post.createdBy.profilepic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{post.createdBy.username}</p>
                    <p className="text-sm text-gray-500">{post.createdBy.phoneNumber}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;