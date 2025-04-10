import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { useAuthStore } from '../utilis/auth'
import { useParams } from 'react-router-dom'

const SavedPost = () => {
  const [posts, setPosts] = useState([])
  const { countCarts, count } = useAuthStore()

  const fetchCarts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/carts/getCart`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPosts(response.data.cart)
    } catch (error) {
      console.log(error.message)
    }
  }, []) // Memoized with useCallback

  useEffect(() => {
    countCarts()
    fetchCarts()
  }, [fetchCarts, countCarts]) // Runs once on mount and if dependencies change

  const RemovePost = async (postId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/carts/removeCart/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Refresh the cart list and count after deletion
      await fetchCarts()
      countCarts()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      SavedPost {count}
      <div>
        {posts.map((saved, index) => (
          <div key={index}>
            <p>{saved.postId}</p>
            <button onClick={() => RemovePost(saved.postId)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPost