import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '../utilis/auth';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const SavedPost = () => {
  const [posts, setPosts] = useState([]);
  const { countCarts, count } = useAuthStore();
  const [loading,setLoading]=useState(true)

  const fetchCarts = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        setLoading(false)
      }
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/carts/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error(error.message);
    }finally{
      setLoading(false)
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
      console.error(error.message);
    }
  };
  if(loading){
    return <LoadingSpinner/>
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-0 md:px-4 sm:px-6 lg:px-8 py-8 pt-14 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center  justify-between mb-2">
            <h1 className="text-xl ml-4 font-bold text-gray-800 dark:text-white">
              Your Collection
              <span className="ml-2 text-xl text-gray-500 font-medium">({count || '0'})</span>
            </h1>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              {posts.map((saved, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {saved.postId?.createdBy.profilepic && (
                        <img
                          src={saved.postId?.createdBy.profilepic}
                          alt="Seller profile"
                          className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-purple-500"
                        />
                      )}
                      <Link
                        to={`/profile/${saved.postId?.createdBy._id}`}
                        className="text-lg font-semibold text-gray-800 dark:text-white hover:text-purple-600 transition-colors"
                      >
                        {saved.postId?.createdBy.username}
                      </Link>
                    </div>

                    <Link
                      to={`/Onepost/${saved.postId._id}`}
                      className="block group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      {saved.postId?.image && (
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={saved.postId.image}
                            alt={saved.postId.productName}
                            className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="p-4">
                                               <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate mb-0">
                          {saved.postId?.productName}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                          {saved.postId?.description}
                        </p>
                      </div>
                    </Link>

                    <div className="flex justify-between items-center mt-0 space-x-2">
                      <Link
                        to={`/Chart/${saved.postId.createdBy._id}`} target="_blank"
                        className="flex-1 inline-block text-center px-2 w-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        Contact Seller
                      </Link>
                      <button
                        onClick={() => RemovePost(saved.postId?._id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                        <span className="font-medium">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
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
