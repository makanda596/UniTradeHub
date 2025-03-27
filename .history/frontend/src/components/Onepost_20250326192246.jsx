import axios from 'axios'
import React, { useEffect, useState } from 'react'

const posts = () => {
  const {posts, setPosts} = useState(null)


  const fetchPost = async ()=>{
    const response = await axios.get('http://localhost:5000/posts/Onepost/67e422964e7bf620b234b2ab')
    setPosts(response.data)
  }


  useEffect(()=>{
    fetchPost()
  })
  return (
    <div>posts</div>
  )
}

export default posts