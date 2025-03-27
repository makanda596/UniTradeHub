import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";  // Import SweetAlert
import market from "../assets/market.avif";
import moment from "moment";
import { FaWhatsapp } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userId } = useParams(); 

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

  // Function to handle adding to cart
  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/addcart/67dd2d8a2200fb944d0ed820');
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart!", 
          confirmButtonColor: "#3085d6",
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

  if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row md:p-10 bg-gray-50 gap-6">
      {/* Profile Section */}
      <div className="bg-white w-full md:w-1/4 md:sticky md:top-10 h-fit">
        <div
          className="bg-white h-30 p-6 rounded-xl shadow-lg relative bg-cover bg-center"
          style={{ backgroundImage: `url(${market})` }}
        >
          <img
            src={user?.profilepic || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>
        <div className="flex flex-col items-center bg-white/70 p-4 rounded-xl">
          <h2 className="text-xl font-bold mt-3">{user?.username || "User Name"}</h2>
          <button
            onClick={() => {
              if (user?.phoneNumber) {
                let formattedPhone = user?.phoneNumber.trim();
                if (!formattedPhone.startsWith("+")) {
                  formattedPhone = "+254" + formattedPhone.slice(-9);
                }
                window.open(`https://wa.me/${formattedPhone}`, "_blank");
              } else {
                alert("Phone number is not available for this post.");
              }
            }}
            className="flex items-center text-green-600 transition"
          >
            <FaWhatsapp /> WhatsApp Me
          </button>
          <p className="text-gray-600 text-center">{user?.email || "No email available"}</p>
          <p>{user?._id}</p>
          <p className="text-gray-600 text-center">
            <span className="text-black font-bold">Bio:</span> {user?.bio || "No bio available"}
          </p>
          <a href={`/Chart/${user?._id}`}>message me</a>
          <p className="text-gray-500 mt-1">
            Followers: <strong>{user?.followers || 0}</strong>
          </p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="bg-white p-1 md:p-14 rounded-xl shadow-lg w-full md:w-2/3">
        <h3 className="text-lg font-semibold border-b pb-2">All Posts Activity</h3>
        <div className="mt-6 px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {user?.posts?.length > 0 ? (
            user.posts.map((post) => (
              <div key={post._id} className="p-4 rounded-lg shadow-md bg-gray-100">
                <div className="flex items-center">
                  <img
                    src={user?.profilepic || "/default-profile.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full shadow-md"
                  />
                  <div className="ml-3">
                    <h4 className="text-gray-800 font-medium"> {user?.username}</h4>
                    <p className="text-gray-500 text-xs"> {user?.email}</p>
                    <p className="text-blue-500 text-xs">{user?.location || "no location set yet"}</p>
                  </div>
                </div>
                <p className="mt-3 text-gray-700 font-semibold">{post.productName}</p>
                <p className="mt-1 text-gray-700">{post.description}</p>
                <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
                {market && <img src={market} alt="Post" className="mt-3 rounded-lg shadow-md h-auto" />}

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart()}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition w-full"
                >
                  Add to Cart
                </button>
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
