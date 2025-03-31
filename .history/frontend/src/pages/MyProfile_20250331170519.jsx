import React, { useEffect, useState } from "react";
import {
  FaUser, FaShoppingCart, FaInbox, FaHeart,
  FaCog, FaSignOutAlt, FaEnvelope, FaMapMarkerAlt,
  FaPhone, FaInfoCircle, FaBookmark, FaBell
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdReviews } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { RiCoupon2Line } from "react-icons/ri";
import { FollowStore } from "../utilis/follow";

const ProfilePage = ({ user, logout, userId }) => {
  const [countReviews, setCountReviews] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const { countFollwers, countfollowing } = FollowStore()

  useEffect(()=>{
    const fetchAlldata = async ()=>{
      await countFollwers()
      await countFollwers()
    };
    fetchAlldata()
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view your profile");
          setLoading(false);
          return;
        }

        // Fetch review count
        const reviewsResponse = await axios.get("http://localhost:5000/reviews/countReviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCountReviews(reviewsResponse.data);

        // Fetch post count
        const postsResponse = await axios.get(`http://localhost:5000/auth/countposts/${userId}`);
        setCountPosts(postsResponse.data.postCount || 0);

      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      window.location.href = "/";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Skeleton */}
            <div className="hidden md:block w-64">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <div className="flex flex-col items-center mb-6">
                  <Skeleton circle height={80} width={80} className="mb-4" />
                  <Skeleton width={120} height={24} className="mb-2" />
                  <Skeleton width={160} height={16} />
                </div>
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} height={16} width="100%" className="mb-4" />
                ))}
              </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                    <Skeleton height={24} width="60%" className="mb-4" />
                    <Skeleton height={16} count={3} className="mb-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              {/* Profile Summary */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={user?.profilepic || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-4"
                />
                <h2 className="text-lg font-bold text-gray-800">{user?.username || "Guest"}</h2>
                <p className="text-gray-500 text-sm">{user?.email || "guest@example.com"}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "overview" ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FaUser className="text-lg" />
                  <span>Overview</span>
                </button>

                <Link
                  to={`/Myposts/${user?._id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <FaShoppingCart className="text-lg" />
                  <span>My Posts</span>
                </Link>

                <Link
                  to={`/customerreviews/${user?._id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <MdReviews className="text-lg" />
                  <span>Customer Reviews</span>
                  {countReviews > 0 && (
                    <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {countReviews}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "wishlist" ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FaBookmark className="text-lg" />
                  <span>Wishlist</span>
                </button>

                <Link
                  to="/Settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <IoMdSettings className="text-lg" />
                  <span>Account Settings</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 transition mt-4"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Profile Header */}
            <div className="md:hidden bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={user?.profilepic || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{user?.username || "Guest"}</h2>
                  <p className="text-gray-500 text-sm">{user?.email || "guest@example.com"}</p>
                </div>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Account Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Personal Info Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaUser className="text-blue-500" />
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-gray-400" />
                        <span className="text-gray-600">{user?.email || "Not provided"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-gray-400" />
                        <span className="text-gray-600">{user?.phoneNumber || "Not provided"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span className="text-gray-600">{user?.location || "Not provided"}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaInfoCircle className="text-gray-400 mt-1" />
                        <span className="text-gray-600">{user?.bio || "No bio provided"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaShoppingCart className="text-green-500" />
                      Your Activity
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-500">Total Posts</p>
                        <p className="text-2xl font-bold text-green-600">{countPosts}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Customer Reviews</p>
                        <p className="text-2xl font-bold text-blue-600">{countReviews}</p>
                      </div>
                    </div>
                  </div>

                  {/* Wishlist Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                    {countFollwers.count}
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaBookmark className="text-purple-500" />
                      {countfollowing.count}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Saved Items</p>
                        <p className="text-2xl font-bold text-purple-600">7</p>
                      </div>
                      <button className="text-purple-500 hover:text-purple-700">
                        View All
                      </button>
                    </div>
                  </div>

                  {/* Notifications Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaBell className="text-yellow-500" />
                      Newsletter & Preferences
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Subscribe to receive updates on the latest products and exclusive offers.
                      </p>
                      <div className="flex flex-col md:flex-row gap-4">
                        <input
                          type="email"
                          defaultValue={user?.email}
                          placeholder="Your email"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition whitespace-nowrap">
                          Subscribe
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        By subscribing, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Wishlist</h2>
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FaBookmark className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-6">Save items you love for easy access later</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;