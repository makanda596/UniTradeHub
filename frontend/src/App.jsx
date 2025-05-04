import { Routes, Route, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Pages & Components
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx";
import Signup from './pages/Signup.jsx'
import Post from "./components/Post.jsx";
import Myposts from "./pages/Myposts.jsx";
import CategoryDetails from "./components/CategoryDetails.jsx";
import Profile from "./pages/Profile.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import ChartPage from './pages/ChartPage.jsx';
import Chart from './pages/Chart.jsx';
import Onepost from './components/Onepost.jsx';
import Reviewspage from "./pages/Reviewspage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/PasswordReset.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import SavedPost from "./pages/SavedPost.jsx";
import GuestDashboard from "./pages/GuestDashboard.jsx";
import About from './pages/About.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import { useAuthStore } from "./utilis/auth.js";
import Terms from "./pages/Terms.jsx";
import Contact from "./pages/Contact.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import Safety from "./pages/Safety.jsx";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/EmailVerification" replace />;

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  const location = useLocation()
  const [user, setUser] = useState(null);
  const { logout, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    if (location.pathname !== '/EmailVerification') {
      localStorage.removeItem('email');
    }
  }, [location]);
  useEffect(() => {
        const fetchUser = async () => {
     
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
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
    
      
      <Routes>
        <Route path="/ResetPassword/:token" element={<ResetPassword />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/EmailVerification" element={<EmailVerification user={user} />} />
        <Route path="/safety" element={<Safety/>}/>

{/* //redirect routes */}
        <Route path="/" element={<RedirectAuthenticatedUser><GuestDashboard /></RedirectAuthenticatedUser>} />
        <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
        <Route path="/signup" element={<RedirectAuthenticatedUser><Signup /></RedirectAuthenticatedUser>} />

        {/* protected routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
        <Route path="/chart" element={<ProtectedRoute><ChartPage /></ProtectedRoute>} />
        <Route path="/Chart/:recieverId" element={<ProtectedRoute><Chart user={user} userId={user?._id} /></ProtectedRoute>} />
        <Route path="/Profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/Myposts" element={<ProtectedRoute><Myposts user={user} userId={user?._id} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MyProfile user={user} logout={logout} userId={user?._id} /></ProtectedRoute>} />
        <Route path="/Settings" element={<ProtectedRoute><Settings user={user} logout={logout} /></ProtectedRoute>} />
        <Route path="/Onepost/:postId" element={<ProtectedRoute><Onepost user={user} /></ProtectedRoute>} />
        <Route path="/saved" element={<ProtectedRoute><SavedPost user={user} /></ProtectedRoute>} />
        <Route path="/customerreviews" element={<ProtectedRoute><Reviewspage user={user} /></ProtectedRoute>} />
        <Route path="/category/:categoryName" element={<CategoryDetails user={user} />} />
        <Route path='/admin' element={<ProtectedRoute><AdminHome /></ProtectedRoute>}/>
       
      </Routes>
  
  );
}

export default App;
