import { create } from 'zustand';
import axios from 'axios';

export const AdminAuthStore = create((set) => ({
    admin: null,               
    isAuthenticated: false, 
    isCheckingAuth: true,       
    isLoading: false,           
    error: null,               
    countUsers:null,
    countPosts:null,
    ReportedPosts:null,
    countReports:null,
    categoryCounts: [],
    topUser: null,
    topUserFollowers: [],
    otherUsers: [],
    countAccount:[],
    alerts: [],

    adminLogin: async (username, password) => {
        try {
            set({ isLoading: true, error: null });

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/adminlogin`,
                { username, password }
            );

            // Save token to localStorage
            localStorage.setItem("admintoken", response.data.token);

            // Update state with admin info
            set({
                admin: response.data.admin,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error logging in",
            });
            throw error;
        }
    },

    adminCheckAuth: async () => {
        set({ isCheckingAuth: true, error: null });

        try {
            const token = localStorage.getItem("admintoken");

            if (!token) {
                set({
                     isAuthenticated: false,
                    isCheckingAuth: false,
                });
                return;
            }

            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/admin/check-auth`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            set({
                admin: response.data.admin,
                isAuthenticated: true,
                isCheckingAuth: false,
                error: null,
            });
        } catch (error) {
            localStorage.removeItem("admintoken");
            set({
                isAuthenticated: false,
                isCheckingAuth: false,
                error: error.response?.data?.message || "Failed to authenticate admin",
            });
        }
    },
    profile:async ()=>{
        try{
            const token= localStorage.getItem("admintoken")
            if(!token){
                set({error:true})
                console.log("no token")
            }
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/profile`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            set({admin:response.data.admin})
        }catch(error){
            console.error(error)
        }
    },
    allUsers:async()=>{
        try {
            const token = localStorage.getItem("admintoken")
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/countUsers`,{
                headers:{Authorization :`Bearer ${token}`}
            })
            set({countUsers:response.data})
        } catch (error) {
            console.error(error.message)
        }
    },
    //counting of all posts
    allPosts: async () => {
        try {
            const token = localStorage.getItem("admintoken")
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/countPosts`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set({ countPosts: response.data })
        } catch (error) {
            console.error(error.message)
        }
    },

    //count reported posts
    allReportedPosts: async () => {
        try {
            const token = localStorage.getItem("admintoken")
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/countReportedPosts`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set({ ReportedPosts: response.data })
        } catch (error) {
            console.error(error.message)
        }
    },

    //countung of the all reported accounts
    allReports: async () => {
        try {
            const token = localStorage.getItem("admintoken")
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/countReports`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set({ countReports: response.data })
        } catch (error) {
            console.error(error.message)
        }
    },

    //counting the categories of each post 

    fetchCategoryCounts: async () => {
        try {
            const token = localStorage.getItem("admintoken");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/categorycounts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ categoryCounts: response.data });
        } catch (error) {
            console.error("Error fetching category counts:", error.message);
        }
    },

    //geting users with most followers 
    getTopUserWithFollowers: async () => {
        try {
            const token = localStorage.getItem("admintoken");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/mostfollowers`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { topUser, followersOfTopUser, otherUsers } = response.data;

            set({
                topUser,
                topUserFollowers: followersOfTopUser,
                otherUsers,
            });
        } catch (error) {
            console.error("Failed to fetch top user data:", error.message);
        }
    },

    //count suspended accounts
    allAccounts: async () => {
        try {
            const token = localStorage.getItem("admintoken")
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/countAccounts`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set({ countAccount: response.data })
        } catch (error) {
            console.error(error.message)
        }
    },

    //fetching all the alerts 
    fetchAlerts: async () => {
        try {
            const token = localStorage.getItem("admintoken")
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getAlerts`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            set({ alerts: response.data, loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Failed to fetch alerts',
                loading: false,
            });
        }
      },
}));
