import { create } from 'zustand';
import axios from 'axios';
import { io } from "socket.io-client";

// Set your API endpoints
const USER_API = "http://localhost:5000/auth";
const ADM_API = "http://localhost:5000/admin";

export const useAuthStore = create((set,get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    messages: null,
    isCheckingAuth: true,
    message: null,
    // Signup method
    signup: async (username, email, phoneNumber, password, gender) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${USER_API}/signup`, { username, email, phoneNumber, password,  gender});
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
            const response = await axios.post(`${USER_API}/adminLogin`, { email, password });
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
            const response = await axios.post(`${USER_API}/login`, { email, password });
            localStorage.setItem("token", response.data.token);
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
            await axios.post(`${USER_API}/logout`, null, { withCredentials: true });
            localStorage.removeItem("token");
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
            throw error;
        }
    },

    // Forgot Password
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
         try {
            const response = await axios.post(`${USER_API}/password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error sending reset password email", isLoading: false });
            throw error;
        }
    },

    // Check Auth Status
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:5000/auth/check-auth', {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
                      

            get().connectSocket();
        } catch (error) {
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

        const socket = io(USER_API, {
            query: {
                userId: user._id,
            },
        });
        socket.connect();

        set({ socket: socket });
        console.log(socket)
        // socket.on("getOnlineUsers", (userIds) => {
        //     set({ onlineUsers: userIds });
        // });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));
