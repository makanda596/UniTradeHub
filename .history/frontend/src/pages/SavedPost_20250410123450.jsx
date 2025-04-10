import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../utilis/auth'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const SavedPost = () => {
    const [posts,setPosts] = useState([])
    const {countCarts,count}=useAuthStore()
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
    },[fetchCarts])

    const RemovePost = async (postId)=>{
      try {
        const token = localStorage.getItem("token")
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/carts/removeCart/${postId}`,{
          headers: { Authorization: `Bearer ${token}` }
        })
        await fetchCarts()
      } catch (error) {
        console.log(error.message)
      }
    }
  return (
    <>
    <Navbar/>
    <div className='mt-20'>SavedPost{count}
          <div>
                  {posts.map((saved,index)=>{
                    return <div key={index}>
                        <p>{saved.postId}</p>
                      <button onClick={()=>RemovePost(saved.postId)}>delete</button>
                    </div>
                  })}
          </div>
    </div>
    </>
  )
}

export default SavedPost