import { create } from 'zustand';
import axios from 'axios';
import { io } from "socket.io-client";

// Set your API endpoints

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
    reviews:[],
    CountReviews:null,
    count:null,
    email:"",
    flash:[],
    Uflash:[],
    // Signup method
    signup: async (username, email, phoneNumber, password, gender) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, { username, email, phoneNumber, password,  gender});
            set({ user: response.data, isLoading: false, isAuthenticated: true });
           localStorage.setItem("email", response.data.user.email)
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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/adminLogin`, { email, password });
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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { email, password });
            localStorage.setItem("token", response.data.token);
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    // Logout 
    logout: async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, null, { withCredentials: true });
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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/resendcode`, { email })
           set({response:response.data ,})
        } catch (error) {
            console.log(error)
        }
    },
    // Forgot Password
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
         try {
             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/password`, { email });
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

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/check-auth`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            set({
                user: response.data.user,
                isAuthenticated: response.data.user.isVerified, 
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

    reportUser: async (recieverId) => {
        try{
        set({loading:false})
        const token = localStorage.getItem("token")

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reports/makeReport/${recieverId}`, { recieverId },{
            headers:{Authorization :`Bearer ${token}`}
        })
        set({loadin:true})
    }catch(error){
        set({error:error.message})
    }

    },
    reportPost: async (postId,reason) => {
        set({ isLoading: true, error: null });

        try {
            set({ loading: false })
            const token = localStorage.getItem("token")

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reports/postReport/${postId}`, { postId,reason}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set({ loadin: true })
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }

    },
   
    connectSocket: () => {
        const { user } = get();
        if (!user || get().socket?.connected) return;

        const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
            query: {
                userId: user._id, 
            },
        });
        socket.connect();
// fmvgovmgombobmgbg
        set({ socket: socket });
        socket.on("server_message" ,(data)=>{
        })
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
    addToCart: async (postId)=>{
   try {
               const token = localStorage.getItem("token");
               await axios.post(
                   `${import.meta.env.VITE_BACKEND_URL}/carts/addCart/${postId}`, // correct URL
                   {}, // no body data
                   {
                       headers: {
                           Authorization: `Bearer ${token}`
                       }
                   }
               );
           
           } catch (error) {
               set({error:error.message})
            
           }
},
countCarts: async ()=>{
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/carts/countCart`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        set({ count: response.data })
    } catch (error) {
        set({error:error.message})
    }
},
countReviwes:async()=>{
        try {
            const token = localStorage.getItem("token");
                       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/countReviews`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({CountReviews:response.data})
        } catch (error) { 
            set({ error: error.message })
        } },
         fetchReviews : async (userId) => {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/reviews/getReview/${userId}`
                    );
                    set({reviews:response.data})
                } catch (error) {
                    console.error(error.message);
                
            }},

    //user flash sales
    UserFlash: async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/flash/userFlash`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set({ Uflash: response.data.userFlash })
            console.log(response.data.userFlash)
        } catch (error) {
            console.error(error.message)
        }
    },        
            //all flashsales
             allFlash: async () => {
                    try {
                        const token = localStorage.getItem("token")
                        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/flash/getFlash`, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        set({ flash: response.data.flashsales })
                        console.log(response.data.flashsales)
                    } catch (error) {
                        console.error(error.message)
                    }
                },

            
            
}));
