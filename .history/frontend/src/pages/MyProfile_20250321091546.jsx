import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaBars, FaTimes, FaUser, FaShoppingCart, FaInbox, 
  FaHeart, FaCog, FaCreditCard, FaMapMarkerAlt, FaSignOutAlt 
} from "react-icons/fa";

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden p-4 text-2xl text-gray-700" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white p-5 shadow-lg md:translate-x-0 transition-transform`}
      >
        {/* Profile Section */}
        <div className="text-center mb-6">
          <img 
            src="https://i.pravatar.cc/100" 
            alt="User Avatar" 
            className="w-20 h-20 mx-auto rounded-full border-2 border-blue-500"
          />
          <h2 className="text-lg font-semibold mt-2">Brian Makanda</h2>
          <p className="text-gray-500 text-sm">oumab743@gmail.com</p>
        </div>

        {/* Sidebar Menu */}
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer">
            <FaShoppingCart className="text-blue-500" /> <span>Orders</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer">
            <FaInbox className="text-green-500" /> <span>Inbox</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer">
            <FaHeart className="text-red-500" /> <span>Wishlist</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer">
            <FaCreditCard className="text-yellow-500" /> <span>Payment Settings</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer">
            <FaMapMarkerAlt className="text-purple-500" /> <span>Address Book</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer">
            <FaCog className="text-gray-500" /> <span>Account Settings</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-red-500 text-white p-2 rounded-md cursor-pointer">
            <FaSignOutAlt /> <span>Logout</span>
          </li>
        </ul>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">Account Overview</h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Account Details */}
          <div className="bg-white p-5 shadow-md rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold mb-2">Account Details</h3>
            <p className="text-gray-600">Brian Makanda</p>
            <p className="text-gray-600">oumab743@gmail.com</p>
          </div>

          {/* Orders Summary */}
          <div className="bg-white p-5 shadow-md rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold mb-2">Orders</h3>
            <p className="text-gray-600">Total Orders: <span className="font-bold text-green-500">15</span></p>
            <p className="text-gray-600">Pending: <span className="font-bold text-red-500">3</span></p>
          </div>

          {/* Wishlist */}
          <div className="bg-white p-5 shadow-md rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold mb-2">Wishlist</h3>
            <p className="text-gray-600">Saved Items: <span className="font-bold text-red-500">7</span></p>
          </div>

          {/* Address Book */}
          <div className="bg-white p-5 shadow-md rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-gray-600">CBD - Luthuli/Afya Centre, Nairobi</p>
            <p className="text-gray-600">+254 742149060</p>
          </div>

          {/* Payment Settings */}
          <div className="bg-white p-5 shadow-md rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-semibold mb-2">Payment Settings</h3>
            <p className="text-gray-600">No saved payment methods</p>
          </div>

          {/* Newsletter Preferences */}
          <div className="bg-white p-5 shadow-md rounded-lg border-l-4 border-gray-500">
            <h3 className="font-semibold mb-2">Newsletter Preferences</h3>
            <p className="text-gray-600">Stay updated with the latest offers</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
