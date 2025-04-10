import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../utilis/auth'
import { useParams } from 'react-router-dom'

const SavedPost = () => {
    const [posts,setPosts] = useState([])
    const {countCarts,count}=useAuthStore()
    const {postId} = useParams()
    const fetchCarts = async ()=>{
        try {
            const token = localStorage.getItem("token")
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/carts/getCart`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            setPosts(response.data.cart)

        } catch (error) {
console.log(error.message)
console.log("cpount",count)
        }
    }
    useEffect(()=>{
      countCarts()
        fetchCarts()
    },[])

    const RemovePost = async ()=>{
      try {
        const token = localStorage.getItem("token")
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/removeCart/${postId}`,{
          headers: { Authorization: `Bearer ${token}` }

        })
      } catch (error) {
        console.log(error.message)
      }
    }
  return (
    <div>SavedPost{count}
          <div>
                  {posts.map((saved,index)=>{
                    return <div key={index}>
                        <p>{saved.postId}</p>
                      <button onClick={RemovePost}>delete</button>
                    </div>
                  })}
          </div>
    </div>
  )
}

export default SavedPost