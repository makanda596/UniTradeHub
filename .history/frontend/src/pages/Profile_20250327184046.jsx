import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import market from "../assets/market.avif";
import moment from "moment";
import { FaWhatsapp } from "react-icons/fa";
import Review from "../components/Review";
import Navbar from "../components/Navbar";

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

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/addcart/67dd2d8a2200fb944d0ed820');
      if (response.status === 200) {
        Swal.fire({ icon: "success", title: "Added to Cart!", confirmButtonColor: "#3085d6" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed to Add", text: "Could not add item to cart.", confirmButtonColor: "#d33" });
    }
  };

  if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-col md:flex-row md:p-10 bg-gray-100 gap-6">
        <div className="bg-white w-full md:w-1/4 md:sticky md:top-10 p-6 rounded-xl shadow-lg">
          <div className="relative w-full h-32 bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${market})` }}></div>
          <img src={user?.profilepic || "/default-profile.png"} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white -mt-12 mx-auto shadow-md" />
          <div className="text-center mt-3">
            <h2 className="text-xl font-bold">{user?.username || "User Name"}</h2>
            <button onClick={() => user?.phoneNumber && window.open(`https://wa.me/${user?.phoneNumber}`, "_blank")} className="flex items-center justify-center text-green-600 font-semibold mt-2">
              <FaWhatsapp className="mr-2" /> WhatsApp Me
            </button>
            <p className="text-gray-600">{user?.email || "No email available"}</p>
            <p className="text-gray-600 text-sm mt-2"><span className="font-semibold">Bio:</span> {user?.bio || "No bio available"}</p>
            <a href={`/Chart/${user?._id}`} className="text-blue-500 underline mt-2 inline-block">Message Me</a>
          </div>
          <Review recieverId={userId} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-3/4">
          <h3 className="text-lg font-semibold border-b pb-2">All Posts Activity</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {user?.posts?.length > 0 ? (
              user.posts.map((post) => (
                <div key={post._id} className="p-4 rounded-lg shadow-md bg-gray-100">
                  <div className="flex items-center">
                    <img src={user?.profilepic || "/default-profile.png"} alt="User" className="w-10 h-10 rounded-full shadow-md" />
                    <div className="ml-3">
                      <h4 className="text-gray-800 font-medium">{user?.username}</h4>
                      <p className="text-gray-500 text-xs">{user?.email}</p>
                      <p className="text-blue-500 text-xs">{user?.location || "No location set yet"}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700 font-semibold">{post.productName}</p>
                  <p className="mt-1 text-gray-700 text-sm">{post.description}</p>
                  <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
                  {market && <img src={market} alt="Post" className="mt-3 rounded-lg shadow-md h-auto" />}
                  <button onClick={handleAddToCart} className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md w-full transition">Add to Cart</button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-4">No posts available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
