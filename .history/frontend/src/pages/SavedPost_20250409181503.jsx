import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SavedPost = () => {
    const [posts,setPosts] = useState([])
    const fetchCarts = async ()=>{
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:5000/carts/getCart",{
                headers:{Authorization:`Bearer ${token}`}
            })
            console.log(response.data.cart)
            setPosts(response.data.cart)

        } catch (error) {
console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchCarts()
    },[])
  return (
    <div>SavedPost
          <div>
                  {posts.map((saved,index)=>{
                    return <div key={index}>
                        <p>{saved.postId}</p>
                    </div>
                  })}
          </div>
    </div>
  )
}

export default SavedPost