import { create } from 'zustand';
import axios from 'axios';
import { io } from "socket.io-client";

// Set your API endpoints
const ADM_API = "http://localhost:5000/admin";
const USER_API=import.meta.env.VITE_BACKEND_URL

export const useAuthStore = create((set,get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    messages: null,
    isCheckingAuth: true,
    message: null,
    onlineUsers: [],
    socket: null,
    // Signup method
    signup: async (username, email, phoneNumber, password, gender) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${USER_API}/auth/signup`, { username, email, phoneNumber, password,  gender});
            set({ user: response.data.user, isLoading: false, isAuthenticated: true });
            get().connectSocket();
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            throw error;
        }
    }, 

    // Admin Login
    adminLogin: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${USER_API}/auth/adminLogin`, { email, password });
            set({ admin: response.data.admin, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    // User Login
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${USER_API}/auth/login`, { email, password });
            localStorage.setItem("token", response.data.token);
            console.log(USER_API)
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
            get().connectSocket();
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    // Logout 
    logout: async () => {
        try {
            await axios.post('https://unitradehubback.onrender.com/auth/logout', null, { withCredentials: true });
            localStorage.removeItem("token");
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
            get().disconnectSocket();
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
            throw error;
        }
    },

   SendAnotherCode :async (email) => {
       set({ isLoading: true, error: null });

        try {
            const response = await axios.post('https://unitradehubback.onrender.com/auth/resendcode', { email })
           set({response:response.data ,})
        } catch (error) {
            console.log(error)
        }
    },
    // Forgot Password
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
         try {
             const response = await axios.post('https://unitradehubback.onrender.com/auth/password', { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error sending reset password email", isLoading: false });
            throw error;
        }
    },

    // Check Auth Status
    // In your checkAuth method, ensure it properly checks verification status
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                set({ isAuthenticated: false, isCheckingAuth: false });
                return;
            }

            const response = await axios.get(`${USER_API}/auth/check-auth`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            // Ensure this includes isVerified from the backend
            set({
                user: response.data.user,
                isAuthenticated: response.data.user.isVerified, // Only true if verified
                isCheckingAuth: false
            });

            if (response.data.user.isVerified) {
                get().connectSocket();
            }
        } catch (error) {
            localStorage.removeItem("token");
            set({
                isAuthenticated: false,
                isCheckingAuth: false,
                error: error.response?.data?.message || "Failed to authenticate",
            });
        }
    },
   

    connectSocket: () => {
        const { user } = get();
        if (!user || get().socket?.connected) return;

        const socket = io('https://unitradehubback.onrender.com', {
            query: {
                userId: user._id,
            },
        });
        socket.connect();

        set({ socket: socket });
        socket.on("server_message" ,(data)=>{
            console.log(data)
        })
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));
