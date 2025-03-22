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
    <div className="flex flex-row items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-500 h-40 flex items-end p-4">
          <img
            src={user?.profileImage || "/default-profile.png"}
            alt="Profile"
            className="absolute -bottom-12 left-6 w-24 h-24 border-4 border-white rounded-full"
          />
        </div>

        {/* Main Content - Two Sections */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Left Section - User Info */}
          <div className="w-full md:w-2/3 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold">{user?.username || "Unknown User"}</h2>
            <p className="text-gray-500">{user?.email || "No email available"}</p>
            <p className="text-gray-600 mt-2">{user?.bio || "No bio provided."}</p>
            <p className="text-gray-400 text-sm mt-1">Location: Nairobi County, Kenya</p>
            <div className="flex space-x-2 mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Message
              </button>
              <button className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100">
                Following
              </button>
            </div>
          </div>

          {/* Right Section - User Posts */}
          {/* <div className="w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold border-b pb-2">Recent Posts</h3>
            {user?.posts?.length > 0 ? (
              <div className="space-y-4 mt-3">
                {user.posts.map((post) => (
                  <div key={post._id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg shadow">
                    <p className="text-gray-700 font-medium">{post.productName}</p>
                    <p className="text-gray-500">{post.description}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Posted on: {new Date(post.createdAt).toDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 mt-4">No posts available</p>
            )}
          </div> */}
        </div>
      </div>
      <div className="w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold border-b pb-2">Recent Posts</h3>
        {user?.posts?.length > 0 ? (
          <div className="space-y-4 mt-3">
            {user.posts.map((post) => (
              <div key={post._id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg shadow">
                <p className="text-gray-700 font-medium">{post.productName}</p>
                <p className="text-gray-500">{post.description}</p>
                <p className="text-gray-400 text-sm mt-1">
                  Posted on: {new Date(post.createdAt).toDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mt-4">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
