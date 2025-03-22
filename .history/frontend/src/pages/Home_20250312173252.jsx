import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { useAuthStore } from '../utilis/auth.js';
import Dashboard from '../components/Dashboard.jsx';
import Post from '../components/Post.jsx';
import axios from 'axios';
const Home = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/auth/profile', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      // Now you can use setUser to update the state
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
    
  
  const { logout } = useAuthStore();
  return (
    <div>

      {user ? (<p>{user?.email}</p>) : (<p>hello</p>)}
      {user ? (<p>{user?.email}</p>) : (<p>hello</p>)}
      {/* <Navbar logout={logout} />
      <Dashboard logout={logout} />
      <Post user={user}/>  */}
    </div>
  )
}

export default Home