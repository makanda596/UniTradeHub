import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SavedPost = () => {
 const{savedPosts,setSavedPosts} = useState([])
    const fetchCarts = async ()=>{
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:5000/carts/getCart",{},{
                headers:{Authorization:`Bearer ${token}`}
            })
            setSavedPosts(response.data)
            console.log(response.data)

        } catch (error) {
console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchCarts()
    },[])
  return (
    <div>SavedPost
          {savedPosts.length > 0 ?
          (<div>
                  {savedPosts.map((saved,index)=>{
                    return <div key={index}>
                        <p>{saved.postId}</p>
                    </div>
                  })}
          </div>) : (<p>no saved post</p>)}
    </div>
  )
}

export default SavedPost