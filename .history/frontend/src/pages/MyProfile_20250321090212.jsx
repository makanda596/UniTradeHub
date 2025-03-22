import React from "react";

const ProfilePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Account Overview</h1>

      {/* Account Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">ACCOUNT DETAILS</h2>
        <p className="text-gray-700">Brian Makanda</p>
        <p className="text-gray-700">oumab743@gmail.com</p>
      </div>

      {/* Address Book */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">ADDRESS BOOK</h2>
        <p className="text-gray-700">Your default shipping address:</p>
        <p className="text-gray-700">Brian Makanda</p>
        <p className="text-gray-700">00100</p>
        <p className="text-gray-700">CBD - Luthuli/Afya Centre/ R. Ngala, Nairobi</p>
        <p className="text-gray-700">+254 712149060 / +254 712253376</p>
      </div>

      {/* Jumia Store Credit */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">JUMIA STORE CREDIT</h2>
        <p className="text-gray-700">Jumia store credit balance: K$h 0</p>
      </div>

      {/* Newsletter Preferences */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">NEWSLETTER PREFERENCES</h2>
        <p className="text-gray-700 mb-4">
          Manage your email communications to stay updated with the latest news and offers.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit Newsletter preferences
        </button>
      </div>

      {/* My Jumia Account */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">My Jumia Account</h2>
        <ul className="space-y-2">
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Orders</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Inbox</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Pending Reviews</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Vouchers</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Wishlist</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Followed Sellers</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Recently Viewed</li>
        </ul>
      </div>

      {/* Account Management */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Management</h2>
        <ul className="space-y-2">
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Payment Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;