import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { useAuthStore } from '../utilis/auth.js';
const Home = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <Navbar logout={logout} />
      <h1>Passing Function as a Prop</h1>
      <Message showAlert={showAlert} />
    </div>
  )
}

export default Home