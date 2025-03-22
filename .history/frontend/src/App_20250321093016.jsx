import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/signup.jsx"
import { useAuthStore } from "./utilis/auth.js";
import Settings from "./pages/Settings.jsx";
import { useEffect, useState  } from "react";
// import axios from 'axios'
import Post from '../src/components/Post.jsx'
import Myposts from '../src/pages/Myposts.jsx'
import CategoryDetails from "./components/CategoryDetails.jsx";
import Profile from "./pages/Profile.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

function App() {
  const [user, setUser] = useState(null);
    const { logout } = useAuthStore();
  

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/auth/profile', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Now you can use setUser to update the state
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  // const [details, setDetails] = useState(null);
  const { isCheckingAuth, checkAuth } = useAuthStore();
  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) return console.log("No token found. Please log in.");

  //       const response = await axios.get('http://localhost:5000/auth/profile', {
  //         headers: { Authorization: `Bearer ${token}` },
  //         withCredentials: true,
  //       });

  //       setDetails(response.data);
  //     } catch (error) {
  //       console.log("Failed to fetch user details. Please log in.", error);
  //     }
  //   };

  //   fetchDetails();
  // }, []);


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Checking authentication - show loading screen
  if (isCheckingAuth) {
    return (

      <div className=" items-center justify-center min-h-screen hidden" >
        <div className="w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
      </div>
    );
  } else {
  return (
    <>
    
      <BrowserRouter>
    <Routes>
      <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
          <Route path="/Profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/Myposts/:userId" element={<ProtectedRoute><Myposts /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MyProfile user={user} logout={logout}/></ProtectedRoute>} />
          <Route path="/category/:categoryName" element={<ProtectedRoute><CategoryDetails /></ProtectedRoute>} />
          <Route path='/signup' element={<RedirectAuthenticatedUser><Signup /></RedirectAuthenticatedUser>} />
    </Routes>
      </BrowserRouter>
    </>
  )
}}

export default App
