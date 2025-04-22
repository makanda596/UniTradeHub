import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '../utilis/auth';
import Navbar from '../components/Navbar';

const SavedPost = () => {
  const [cartItems, setCartItems] = useState([]); // Renamed 'posts' to 'cartItems' for clarity
  const { countCarts, count } = useAuthStore();

  const fetchCart = useCallback(async () => { // Renamed 'fetchCarts' to 'fetchCart' for singular
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/carts/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data); // Directly use response.data as it's the cart object
      console.log("Fetched Cart:", response.data);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      // Optionally set an error state to display a user-friendly message
    }
  }, []);

  useEffect(() => {
    countCarts();
    fetchCart();
  }, [fetchCart, countCarts]);

  const RemoveCartItem = async (postId) => { // Renamed 'RemovePost' to 'RemoveCartItem'
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/carts/removeCart/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart(); // Re-fetch the cart after removing an item
      countCarts();
      console.log(`Removed item with Post ID: ${postId}`);
    } catch (error) {
      console.error("Error removing item:", error.message);
      // Optionally display an error message to the user
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-20">
        <h1 className="text-2xl font-bold mb-4">Your Cart ({count || "0"})</h1> {/* Updated heading */}
        {/* Removed the "WE ARE WORKING ON THIS FEATURE..." message */}
        <div className="grid gap-4">
          {cartItems && cartItems.length > 0 ? ( // Ensure cartItems exists before mapping
            cartItems.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm">
                {item.postId && item.postId.productName ? (
                  <>
                    <p className="text-lg">Product: {item.postId.productName}</p> {/* Display product name */}
                    <p className="text-sm text-gray-600">Post ID: {item.postId._id || item.postId}</p> {/* Display Post ID */}
                  </>
                ) : (
                  <p className="text-gray-500">Product information not available</p>
                )}
                <button
                  onClick={() => RemoveCartItem(item.postId._id || item.postId)} // Use the actual postId for removal
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p> {/* Updated message */}
          )}
        </div>
      </div>
    </>
  );
};

export default SavedPost;