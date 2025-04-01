import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import market from "../assets/market.avif";
import moment from "moment";
import { FaWhatsapp, FaShoppingCart, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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
  const [isActive, setIsActive] = useState(false);

  const timeAgo = (date) => moment(date).fromNow();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError("Failed to load user profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/addcart/67dd2d8a2200fb944d0ed820");
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart!",
          showConfirmButton: false,
          timer: 1500,
          background: "#f8fafc",
          position: "top-end",
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

  const handleWhatsAppClick = () => {
    if (user?.phoneNumber) {
      let formattedPhone = user?.phoneNumber.trim();
      if (!formattedPhone.startsWith("+")) {
        formattedPhone = "+254" + formattedPhone.slice(-9);
      }
      window.open(`https://wa.me/${formattedPhone}`, "_blank");
    } else {
      Swal.fire({
        icon: "info",
        title: "Contact Unavailable",
        text: "This user hasn't provided a phone number.",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  if (loading)
    return (
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

  if (error)
    return (
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute -bottom-12 left-6">
                  <img
                    src={user?.profilepic || "/default-profile.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-white shadow-lg object-cover"
                  />
                </div>
              </div>
              <div className="pt-12 px-6 pb-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800">{user?.username || "User Name"}</h2>
                  <FollowButton userId={userId} />
                </div>
                <p className="mt-3 text-gray-600">{user?.bio || "No bio available"}</p>
                <div className="mt-4 flex space-x-4">
                  <button onClick={handleWhatsAppClick} className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg">
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </button>
                  <button onClick={() => setIsActive(true)} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg">
                    <FaEnvelope className="mr-2" /> Leave a Review
                  </button>
                </div>
                {isActive && <Review followedId={userId} />}
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Listings</h3>
              {user?.posts?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.posts.map((post) => (
                    <div key={post._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                      <img src={market} alt={post.productName} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h4 className="font-bold">{post.productName}</h4>
                        <p className="text-blue-600">KSh {post.price}</p>
                        <button onClick={handleAddToCart} className="mt-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg">
                          <FaShoppingCart className="mr-1" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No listings available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
