import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { useAuthStore } from '../utilis/auth.js';
import Dashboard from '../components/Dashboard.jsx';
const Home = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <Navbar logout={logout} />
      <p>hello</p>
      <Dashboard/>
    </div>
  )
}

export default Home