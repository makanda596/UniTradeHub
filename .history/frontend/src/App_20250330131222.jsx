import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/signup.jsx";
import { useAuthStore } from "./utilis/auth.js";
import Settings from "./pages/Settings.jsx";
import { useEffect, useState } from "react";
import Post from '../src/components/Post.jsx';
import Myposts from '../src/pages/Myposts.jsx';
import CategoryDetails from "./components/CategoryDetails.jsx";
import Profile from "./pages/Profile.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import axios from "axios";
import ChartPage from './pages/ChartPage.jsx';
import Chart from './pages/chart.jsx';
import ImageUpload from "./pages/ImageUpload.jsx";
import Onepost from './components/Onepost.jsx';
import Reviewspage from "./pages/Reviewspage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/PasswordReset.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to='/EmailVerification' replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to='/home' replace />;
  }

  return children;
};

function App() {
  const { logout, user: authUser, isAuthenticated, checkAuth, isCheckingAuth } = useAuthStore();

  // Add axios request interceptor to include token
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // Add axios response interceptor to handle 401 errors
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          checkAuth(); // This will update the auth state
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [checkAuth]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/EmailVerification" element={<EmailVerification user={authUser} />} />
        <Route path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
        <Route path="/chartPage" element={<ProtectedRoute><ChartPage /></ProtectedRoute>} />
        <Route path="/Profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/Chart/:recieverId" element={<ProtectedRoute><Chart user={authUser} /></ProtectedRoute>} />
        <Route path="/Myposts/:userId" element={<ProtectedRoute><Myposts user={authUser} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MyProfile user={authUser} logout={logout} userId={authUser?._id} /></ProtectedRoute>} />
        <Route path="/Settings" element={<ProtectedRoute><Settings user={authUser} logout={logout} /></ProtectedRoute>} />
        <Route path="/Onepost/:Category/:postId" element={<ProtectedRoute><Onepost /></ProtectedRoute>} />
        <Route path="/customerreviews/:userId" element={<ProtectedRoute><Reviewspage user={authUser} userId={authUser?._id} /></ProtectedRoute>} />
        <Route path="/category/:categoryName" element={<ProtectedRoute><CategoryDetails /></ProtectedRoute>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser><Signup /></RedirectAuthenticatedUser>} />
        <Route path='/upload' element={<ProtectedRoute><ImageUpload /></ProtectedRoute>} />
        <Route path="/ResetPassword/:token" element={<ResetPassword />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;