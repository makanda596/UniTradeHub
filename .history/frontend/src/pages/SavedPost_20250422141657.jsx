import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '../utilis/auth';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const SavedPost = () => {
  const [posts, setPosts] = useState([]);
  const { countCarts, count } = useAuthStore();

  const fetchCarts = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/carts/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    countCarts();
    fetchCarts();
  }, [fetchCarts, countCarts]);

  const RemovePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/carts/removeCart/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCarts();
      countCarts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Your Collection
              <span className="ml-2 text-xl text-gray-500 font-medium">({count || '0'})</span>
            </h1>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((saved, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      {saved.userId?.profilepic && (
                        <img
                          src={saved.userId.profilepic}
                          alt="Seller profile"
                          className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-purple-500"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Sold by
                        </p>
                        <Link
                          to={`/profile/${saved.userId?._id}`}
                          className="text-lg font-semibold text-gray-800 dark:text-white hover:text-purple-600 transition-colors"
                        >
                          {saved.userId?.username}
                        </Link>
                      </div>
                    </div>

                    {saved.postId?.image && (
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                        <Link to={`/Onepost/${saved.postId._id}`}
                        <img
                          src={saved.postId.image}
                          alt={saved.postId.productName}
                          className="w-full h-full object-cover transform transition-transform hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate">
                        {saved.postId?.productName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-3">
                        {saved.postId?.description}
                      </p>
                    </div>

                    <button>   <a href={`/Chart/${saved.postId.createdBy}`} >contact Seller </a></button>  
                    <button
                      onClick={() => RemovePost(saved.postId?._id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                      <span className="font-medium">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Your Collection is Empty
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Start saving your favorite items to see them here!
                </p> 
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedPost;