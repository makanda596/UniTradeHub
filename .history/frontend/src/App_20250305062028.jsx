import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/signup.jsx"
import { useAuthStore } from "./utilis/auth.js";

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
