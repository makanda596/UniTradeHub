import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaInbox, FaStar, FaTicketAlt, FaHeart, FaStore, FaEye, FaCog, FaCreditCard, FaBars, FaTimes } from "react-icons/fa";

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden p-4 bg-white shadow-md">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-700">
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? "block" : "hidden"} md:block w-64 bg-white p-4 shadow-md`}>
        <h2 className="text-lg font-semibold mb-4">My Jumia Account</h2>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <FaShoppingCart /> <span>Orders</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <FaInbox /> <span>Inbox</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <FaStar /> <span>Pending Reviews</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <FaTicketAlt /> <span>Vouchers</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <FaHeart /> <span>Wishlist</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <FaStore /> <span>Followed Sellers</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <FaEye /> <span>Recently Viewed</span>
          </li>
          <hr className="my-4" />
          <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <FaCog /> <span>Account Management</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <FaCreditCard /> <span>Payment Settings</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Details */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="font-semibold mb-2">ACCOUNT DETAILS</h3>
            <p className="text-gray-600">Brian Makanda</p>
            <p className="text-gray-600">oumab743@gmail.com</p>
          </div>

          {/* Address Book */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="font-semibold mb-2 flex justify-between">
              ADDRESS BOOK <span className="text-blue-600 cursor-pointer">✏️</span>
            </h3>
            <p className="text-gray-600">Brian Makanda</p>
            <p className="text-gray-600">00100</p>
            <p className="text-gray-600">CBD - Luthuli/Afya Centre, Nairobi</p>
            <p className="text-gray-600">+254 742149060 / +254 712253376</p>
          </div>

          {/* Jumia Store Credit */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="font-semibold mb-2">JUMIA STORE CREDIT</h3>
            <p className="text-blue-600 font-bold">Jumia store credit balance: KSh 0</p>
          </div>

          {/* Newsletter Preferences */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="font-semibold mb-2">NEWSLETTER PREFERENCES</h3>
            <p className="text-gray-600">Manage your email communications to stay updated with the latest news and offers.</p>
            <p className="text-blue-600 cursor-pointer font-semibold">Edit Newsletter preferences</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;