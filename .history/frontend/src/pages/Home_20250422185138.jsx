import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useAuthStore } from "../utilis/auth.js";
import Dashboard from "../components/Dashboard.jsx";
import WarningMessage from "../components/WarningMessage.jsx"; // Make sure the path is correct
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const { logout } = useAuthStore();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {/* <Navbar logout={logout} user={user} /> */}
      {user ? <Dashboard logout={logout} user={user} userId={user._id} /> : <p className="text-center mt-0">Loading...</p>}
      <WarningMessage />

    </div>
  );
};

export default Home;
