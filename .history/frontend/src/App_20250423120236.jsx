import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Explore content, connect with others, and enjoy the experience — no account required!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 rounded-xl bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">Browse Posts</h2>
          <p className="text-gray-600">Read through popular and featured posts shared by users.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">Join the Community</h2>
          <p className="text-gray-600">Create an account to start interacting and posting yourself.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
