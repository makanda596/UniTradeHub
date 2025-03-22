import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { useAuthStore } from '../utilis/auth.js';
import Dashboard from '../components/Dashboard.jsx';
import Post from '../components/Postjsx';
const Home = () => {
  const { user } = useAuthStore();
  console.log(user?.email)
  const { logout } = useAuthStore();
  return (
    <div>
      <Navbar logout={logout} />
      <p>{user?.email}</p>
      <Dashboard logout={logout} />
      <Post /> 
    </div>
  )
}

export default Home