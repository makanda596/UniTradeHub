import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import market from "../assets/market.avif";
import moment from "moment";
import { FaWhatsapp, FaShoppingCart, FaEnvelope, FaMapMarkerAlt, FaUserEdit, FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Review from "../components/Review";
import Navbar from "../components/Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FollowButton from "../components/FollowButton";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userId } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const timeAgo = (date) => moment(date).fromNow();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/addcart/67dd2d8a2200fb944d0ed820');
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart!",
          showConfirmButton: false,
          timer: 1500,
          background: '#f8fafc',
          position: 'top-end'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add",
        text: "There was a problem adding the item to your cart.",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Skeleton height={200} className="rounded-xl mb-4" />
            <Skeleton count={5} className="mb-2" />
          </div>
          <div className="w-full md:w-2/3">
            <Skeleton height={40} className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 rounded-lg">
                  <Skeleton height={200} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Profile</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="container mx-auto px-0 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Profile Section */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div
                className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative"
                style={user?.coverPhoto ? { backgroundImage: `url(${user.coverPhoto})` } : {}}
              >
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <img
                      src={user?.profilepic || "/default-profile.png"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-1 border-blue-00 shadow-lg object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-12 px-6 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{user?.username || "User Name"}</h2>
                  </div>
                  <FollowButton userId={userId} />
                </div>

                <p className="mt-3 text-gray-600"><span className="font-bold tet-black">seller`s Bio:</span> {user?.bio || "No bio available"}</p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    <span>{user?.location || "Location not set"}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => window.location.href = `/Chart/${user?._id}`}
                    className="flex items-center justify-center px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition "
                  >
                    <FaEnvelope className="mr-2" />
                    Message Seller
                  </button>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                  >
                    <FaStar className="mr-2" /> Leave a Review
                  </button>
                </div>
              </div>
            </div>

TO DO IF POSSIBLE FOR UPDATES
            {/* <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-medium text-gray-700 mb-4">Seller Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{user?.posts?.length || 0}</p>
                  <p className="text-xs text-gray-500">Listings</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">24</p>
                  <p className="text-xs text-gray-500">Sold Items</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-600">4.8</p>
                  <p className="text-xs text-gray-500">Avg. Rating</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-yellow-600">98%</p>
                  <p className="text-xs text-gray-500">Response Rate</p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Posts Section */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Products</h3>
                  <button className="text-blue-500 text-sm font-medium flex items-center">
                    View all <IoIosArrowForward className="ml-1" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {user?.posts?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.posts.map((post) => (
                      <div key={post._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                        <div className="relative">
                          <img
                            src={market}
                            alt={post.productName}
                            className="w-full h-48 object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-white/90 text-xs px-2 py-1 rounded-full">
                            {timeAgo(post.createdAt)}
                          </span>
                        </div>

                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-gray-800">{post.productName}</h4>
                            </div>
                            <div className="flex-shrink-0">
                              <img
                                src={user?.profilepic || "/default-profile.png"}
                                alt="User"
                                className="w-8 h-8 rounded-full shadow-sm"
                              />
                            </div>
                          </div>

                          <p className="mt-2 text-gray-600 text-sm line-clamp-2">{post.description.length > 60 ? (<p>{post.description.slice(0, 60)}...</p>) : (<>{post.description}</>)}</p>

                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs text-gray-500">{post.location || user?.location || "Location not specified"}</span>
                            <button
                              onClick={handleAddToCart}
                              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm transition"
                            >
                              <FaShoppingCart className="mr-1" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">No Listings Yet</h4>
                    <p className="text-gray-500 max-w-md mx-auto">This user hasn't posted any items for sale. Check back later!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewForm && (
        <Review followedId={userId}
          onClose={() => setShowReviewForm(false)}/>
      )}
    </div>
  );
};

export default UserProfile;