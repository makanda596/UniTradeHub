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
import Setting from "./pages/Settings.jsx";
import ChartPage from './pages/ChartPage.jsx'
import Chart from './pages/chart.jsx'
import ImageUpload from "./pages/ImageUpload.jsx";
import Onepost  from './components/Onepost.jsx'
import Reviewspage from "./pages/Reviewspage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/PasswordReset.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import FollowersFollowing from "./pages/FollowersFollowing.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to='/EmailVerification' replace />;
  }

  return children;
};
// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated ,user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/home' replace />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(null);
    const { logout } = useAuthStore();
  

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
            if (!token) return 

            const response = await axios.get('http://localhost:5000/auth/profile', {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            });

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
  } 
  return (
    <>
    
      <BrowserRouter>
    <Routes>
      <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='EmailVerification' element={<EmailVerification user={user}/>}/>
          <Route path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
          <Route path="/chartPage" element={<ProtectedRoute><ChartPage /></ProtectedRoute>} />
          <Route path="/FollowersFollowing" element={<ProtectedRoute><FollowersFollowing user={user} /></ProtectedRoute>} />
          <Route path="/Profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/Chart/:recieverId" element={<ProtectedRoute><Chart user={user} /></ProtectedRoute>} />
          <Route path="/Myposts/:userId" element={<ProtectedRoute><Myposts user={user} /></ProtectedRoute>} />

          <Route path="/profile" element={<ProtectedRoute><MyProfile user={user} logout={logout} userId={user?._id} /></ProtectedRoute>} />
          <Route path="/Settings" element={<ProtectedRoute><Settings user={user} logout={logout} /></ProtectedRoute>} />
          <Route path="/Onepost/:Category/:postId" element={<ProtectedRoute><Onepost /></ProtectedRoute>} />
          <Route path="/customerreviews/:userId" element={<ProtectedRoute><Reviewspage user={user} userId={user?._id} /></ProtectedRoute>}/>
          <Route path="/category/:categoryName" element={<ProtectedRoute><CategoryDetails /></ProtectedRoute>} />
          <Route path='/signup' element={<RedirectAuthenticatedUser><Signup /></RedirectAuthenticatedUser>} />
          <Route path='/upload' element={<ImageUpload />}/>
          <Route path="/ResetPassword/:token" element={<ResetPassword />}/>
          <Route path='/ForgotPassword' element={<ForgotPassword/> }/>
    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
