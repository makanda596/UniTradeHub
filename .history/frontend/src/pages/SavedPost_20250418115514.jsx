import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { useAuthStore } from '../utilis/auth'
import Navbar from '../components/Navbar'

const SavedPost = () => {
  const [posts, setPosts] = useState([])
  const { countCarts, count } = useAuthStore()

  const fetchCarts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/carts/getCart`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPosts(response.data)
     console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  useEffect(() => {
    countCarts()
    fetchCarts()
  }, [fetchCarts, countCarts])

  const RemovePost = async (postId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/carts/removeCart/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await fetchCarts()
      countCarts() 
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-20">
        <h1 className="text-2xl font-bold mb-4">Saved Posts ({count || "0"})</h1>
        <h2>WE ARE WORKING ON THIS FEATURE BUT PROMISE WITHIN TIME IT WILLWORK PERFECTLY THANK YOU</h2>
        <div className="grid gap-4">
          {posts.length > 0 ? (
            posts.map((saved, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm">
                <p className="text-lg">Post ID: {saved.postId}</p>
                <button
                  onClick={() => RemovePost(saved.postId)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No saved posts yet</p>
          )} 
        </div>
      </div>
    </>
  )
}

export default SavedPost