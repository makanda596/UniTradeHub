import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/signup.jsx"
import { useAuthStore } from "./utilis/auth.js";
import { useEffect, useState } from "react";
import axios from 'axios'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  const [details, setDetails] = useState(null);
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.log("No token found. Please log in.");

        const response = await axios.get('http://localhost:5000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setDetails(response.data);
      } catch (error) {
        console.log("Failed to fetch user details. Please log in.", error);
      }
    };

    fetchDetails();
  }, []);


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
          <Route path="/" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
      </BrowserRouter>
    </>
  )
}}

export default App
