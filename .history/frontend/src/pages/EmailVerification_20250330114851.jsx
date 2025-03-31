import { useEffect } from 'react';
import { useAuthStore } from '../utilis/auth';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // If somehow a verified user gets here, redirect them
    if (user?.isVerified) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="mb-4">
          We've sent a verification link to <strong>{user?.email}</strong>.
          Please check your inbox and verify your email to continue.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/resend-verification')}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Resend Verification Email
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;