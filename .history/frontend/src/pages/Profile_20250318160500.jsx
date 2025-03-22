import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <p className="text-center mt-20 text-lg">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 h-48 flex justify-center items-center">
          <img
            src={user?.profilepic || "/mnt/data/image.png"} // Using uploaded image as profile picture
            alt="Profile"
            className="absolute -bottom-12 w-28 h-28 border-4 border-white rounded-full shadow-lg"
          />
        </div>

        {/* Profile Info & Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section - User Info */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">{user?.username || "Unknown User"}</h2>
            <p className="text-gray-500">{user?.email || "No email available"}</p>
            <p className="text-gray-600 mt-3">{user?.bio || "No bio provided."}</p>
            <p className="text-gray-400 text-sm mt-1">📍 Nairobi County, Kenya</p>

            <div className="flex space-x-3 mt-5">
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Message
              </button>
              <button className="px-5 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition">
                Following
              </button>
            </div>
          </div>

          {/* Right Section - Recent Posts */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold border-b pb-2 text-gray-700">Recent Posts</h3>
            {user?.posts?.length > 0 ? (
              <div className="space-y-4 mt-3">
                {user.posts.map((post) => (
                  <div key={post._id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow">
                    <h4 className="text-gray-800 font-medium">{post.productName}</h4>
                    <p className="text-gray-600 text-sm">{post.description}</p>
                    <p className="text-gray-400 text-xs mt-2">📅 {new Date(post.createdAt).toDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 mt-4">No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
