import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {loading ? (
        <p className="text-gray-600 text-lg">Loading profile...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 h-40 flex items-end p-4">
            <img
              src="/profile-pic.jpg"
              alt="Profile"
              className="absolute -bottom-12 left-4 w-24 h-24 border-4 border-white rounded-full"
            />
          </div>
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">{user?.username}</h1>
            <p className="text-gray-500">{user?.email || "No email available"}</p>
            <p className="text-gray-500">Nairobi County, Kenya</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Message</button>
              <button className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200">Following</button>
            </div>
          </div>

          {/* About Section */}
          <div className="p-6">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-gray-600 mt-2">Helping Businesses & Personal Brands Use AI, SEO & Digital Marketing to Grow Faster.</p>
          </div>

          {/* Posts Section */}
          <div className="p-6">
            <h3 className="text-lg font-semibold">Recent Posts</h3>
            {user?.posts?.length > 0 ? (
              user.posts.map((post) => (
                <div key={post._id} className="p-3 border-b border-gray-200">
                  <p className="text-gray-700 font-medium">{post.description}</p>
                  <p className="text-gray-500 text-sm">{post.productName}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No posts available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
