import React, { useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaInbox,
  FaStar,
  FaTicketAlt,
  FaHeart,
  FaStore,
  FaEye,
  FaCog,
  FaCreditCard,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBell,
} from "react-icons/fa";

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">My Account</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white shadow-md p-6`}
      >
        <h2 className="text-xl font-bold mb-6 text-blue-600">My Account</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaUser className="text-lg" />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaShoppingCart className="text-lg" />
            <span>Orders</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaInbox className="text-lg" />
            <span>Inbox</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaStar className="text-lg" />
            <span>Reviews</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaTicketAlt className="text-lg" />
            <span>Vouchers</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaHeart className="text-lg" />
            <span>Wishlist</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaStore className="text-lg" />
            <span>Followed Sellers</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaEye className="text-lg" />
            <span>Recently Viewed</span>
          </li>
          <hr className="my-4 border-gray-200" />
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaCog className="text-lg" />
            <span>Settings</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaCreditCard className="text-lg" />
            <span>Payment</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Overview</h2>

        {/* Account Details Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Profile Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaUser className="text-gray-500" />
              <div>
                <p className="text-gray-600">Brian Makanda</p>
                <p className="text-sm text-gray-500">Full Name</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-gray-500" />
              <div>
                <p className="text-gray-600">oumab743@gmail.com</p>
                <p className="text-sm text-gray-500">Email Address</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-gray-500" />
              <div>
                <p className="text-gray-600">00100, Nairobi, Kenya</p>
                <p className="text-sm text-gray-500">Shipping Address</p>
              </div>
            </div>
          </div>
        </div>

        {/* Store Credit Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Store Credit</h3>
          <p className="text-2xl font-bold text-blue-600">KSh 0.00</p>
          <p className="text-sm text-gray-500">Available balance</p>
        </div>

        {/* Newsletter Preferences Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Newsletter Preferences</h3>
          <p className="text-gray-600 mb-4">
            Stay updated with the latest news, offers, and promotions.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Manage Preferences
          </button>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaBell className="text-gray-500" />
              <div>
                <p className="text-gray-600">Order #12345 shipped</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaBell className="text-gray-500" />
              <div>
                <p className="text-gray-600">New voucher added</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;