import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import market from '../assets/market.avif'
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {userId} = useParams()

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
    <div className="flex flex-row p-8 bg-gray-100 min-h-screen">
      <div className="w-full ">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <img
            src={user?.profilePic || "/default-profile.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold">{user?.name || "User Name"}</h2>
            <p className="text-gray-600 text-sm">{user?.bio || "No bio available"}</p>
            <p className="text-gray-500 text-sm mt-1">
              Followers: <strong>{user?.followers || 0}</strong>
            </p>
            <div className="mt-3 flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Message</button>
              <button className="border border-gray-400 px-4 py-2 rounded-md">Following</button>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold border-b pb-2">All Activity</h3>
          <div className="flex space-x-4 mt-4">
            <button className="text-green-600 border-b-2 border-green-600 pb-1">Posts</button>
            <button className="text-gray-600">Comments</button>
            <button className="text-gray-600">Videos</button>
            <button className="text-gray-600">Images</button>
          </div>

          {/* Posts Section */}
          <div className="mt-4">
            {user?.posts?.length > 0 ? (
              user.posts.map((post) => (
                <div key={post._id} className="mt-4 p-4 border border-gray-200 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <img
                      src={user?.profilepic}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                      <h4 className="text-gray-800 font-medium">{user?.username}</h4>
                      <p className="text-gray-500 text-xs">{user?.email}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{post.description}</p>
                  {market && <img src={market} alt="Post" className="mt-3 rounded-lg" />}
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-4">No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;