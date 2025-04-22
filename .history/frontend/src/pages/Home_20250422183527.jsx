import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useAuthStore } from "../utilis/auth.js";
import Dashboard from "../components/Dashboard.jsx";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");

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
    // Set the warning message when the component mounts
    setWarningMessage("Please be aware of scammers. Do not purchase a product without seeing it.");
  }, []);

  const { logout } = useAuthStore();

  return (
    <div>
      <Navbar logout={logout} user={user} />
      {warningMessage && (
        <div className="bg-yellow-200 text-yellow-800 p-3 mt-20 text-center">
          {warningMessage}
        </div>
      )}
      {user ? <Dashboard logout={logout} user={user} userId={user._id} /> : <p>Loading...</p>}
    </div>
  );
};

export default Home;