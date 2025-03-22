import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import market from "../assets/market.avif";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/profile/${userId}`); // Replace with actual API
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row md:p-10 bg-gray-50 gap-6">
      {/* Profile Section (Fixed on Large Screens) */}
      <div className="w-full md:w-1/4 md:sticky md:top-10 h-fit">
        <div
          className="bg-white p-6 rounded-xl shadow-lg relative bg-cover bg-center"
          style={{ backgroundImage: `url(${market})` }}
        >
          <div className="flex flex-col items-center bg-white/70 p-4 rounded-xl">
            <img
              src={user?.profilepic || "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <h2 className="text-xl font-bold mt-3">{user?.name || "User Name"}</h2>
            <p className="text-gray-600 text-center">{user?.bio || "No bio available"}</p>
            <p className="text-gray-500 mt-1">
              Followers: <strong>{user?.followers || 0}</strong>
            </p>
            <div className="mt-4 flex space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition">
                Message
              </button>
              <button className="border border-gray-400 px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
                Following
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Activity Feed */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-2/3">
        <h3 className="text-lg font-semibold border-b pb-2">All Activity</h3>
        <div className="flex space-x-6 mt-4">
          <button className="text-green-600 border-b-2 border-green-600 pb-1 font-medium hover:text-green-700">
            Posts
          </button>
          <button className="text-gray-600 hover:text-gray-800">Comments</button>
          <button className="text-gray-600 hover:text-gray-800">Videos</button>
          <button className="text-gray-600 hover:text-gray-800">Images</button>
        </div>

        {/* Posts Section */}
        <div className="mt-6 space-y-4">
          {user?.posts?.length > 0 ? (
            user.posts.map((post) => (
              <div key={post._id} className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
                <div className="flex items-center">
                  <img
                    src={user?.profilePic || "/default-profile.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full shadow-md"
                  />
                  <div className="ml-3">
                    <h4 className="text-gray-800 font-medium">{user?.username}</h4>
                    <p className="text-gray-500 text-xs">{user?.email}</p>
                  </div>
                </div>
                <p className="mt-3 text-gray-700">{post.description}</p>
                {market && <img src={market} alt="Post" className="mt-3 rounded-lg shadow-md" />}
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
