import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { useAuthStore } from '../utilis/auth.js';
import Dashboard from '../components/Dashboard.jsx';
import Post from '../components/Post.jsx';
import axios from 'axios';
const Home = () => {

  const {user,setUser} = useState(null)

  const fetchUser = async ()=>{
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get('http://localhost:5000/auth/profile',{
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
       }   )
      console.log(response.data)

      
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);

    }
  }
  useEffect(()=>{
    fetchUser()
  },[])
  const { logout } = useAuthStore();
  return (
    <div>
      <Navbar logout={logout} />
      <p>{user?.email}</p>
      <Dashboard logout={logout} />
      <Post user={user}/> 
    </div>
  )
}

export default Home