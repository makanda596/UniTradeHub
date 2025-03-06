import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { useAuthStore } from '../utilis/auth.js';
const Home = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <Navbar logout={logout} />
    </div>
  )
}

export default Home