import axios from 'axios'; 
import { create } from 'zustand';

const FOLLOW_API = import.meta.env.VITE_BACKEND_URL

// const { userId } = useParams()
export const FollowStore = create((set) => ({
    followers: [],
    following: [],
    userfollowers: [],
    userfollowing: [],
    isLoading: false,
    status:false,
    countfollowing: "",
    countfollowers: "",
    usercountfollowing: "",
   usercountfollowers: "",


    fetchFollowers: async (userId) => {
        try {

            const response = await axios.get(`${FOLLOW_API}/follow/getfollowers/${userId}`);

            set({ followers: response.data.followers });
        } catch (error) {
            console.error("Error fetching followers", error);
        }
    },

    fetchFollowing: async (userId) => {
        try {
            const response = await axios.get(`${FOLLOW_API}/follow/following/${userId}`); // ✅ Fixed URL
            set({ following: response.data.following });
        } catch (error) {
            console.error("Error fetching following", error);
        }
    },

    userfetchFollowing: async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${FOLLOW_API}/follow/usergetfollowing`,{
                headers:{Authorization :`Bearer ${token}`}
            }); // ✅ Fixed URL
            set({ userfollowing: response.data.following });
        } catch (error) {
            console.error("Error fetching following", error);
        }
    },
    userfetchFollowers: async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${FOLLOW_API}/follow/usergetfollowers`, {
                headers: { Authorization: `Bearer ${token}` }
            }); // ✅ Fixed URL
            set({ userfollowers: response.data.followers });
        } catch (error) {
            console.error("Error fetching following", error);
        }
    },


    handleFollow: async(userId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Please log in to follow users.");
                return;
            }

            const response = await axios.post(
                `${FOLLOW_API}/follow/followUser/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            set((state) => ({
                following: [...state.following, response.data.newFollower],
            }));
        } catch (error) {
            console.error("Error following user", error);
        }
    },

    handleUnfollow: async (userId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${FOLLOW_API}/follow/unfollow/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set((state) => ({           following: state.following.filter((user) => user.userId._id !== userId),            }));
        } catch (error) {
            console.error("Error unfollowing user", error);
        }
    },

    // In FollowStore
    handleUserUnfollow: async (followedUserId) => {
        try {
            const token = localStorage.getItem("token")
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/follow/unfollow/${followedUserId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set((state) => ({
                following: state.following.filter(u => u.followedId._id !== followedUserId)
            }));
        } catch (error) {
            console.error("Unfollow error:", error);
            throw error; // Propagate error to component
        }
    },
    // In FollowStore
    handleUserfollow: async (followerUserId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/follow/followUser/${followerUserId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            throw new Error("Failed to unfollow user");
        }
    },
    countfollowersfunction: async (userId) => {
        try {
            const response = await axios.get(`${FOLLOW_API}/follow/countfollowers/${userId}`);

            set({ countfollowers: response.data });
        } catch (error) {
            console.error("Error fetching followers count", error);
        }
    }, 

    countfollowingfunction: async (userId) => {
        try {
            const response = await axios.get(`${FOLLOW_API}/follow/countfollowing/${userId}`);

            set({ countfollowing: response.data });
        } catch (error) { 
            console.error("Error fetching following count", error);
        }
    },

     usercountfollowersfunction: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${FOLLOW_API}/follow/Usercountfollowers`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ usercountfollowers: response.data });
        } catch (error) {
            console.error("Error fetching followers count", error);
        }
    },

    usercountfollowingfunction: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${FOLLOW_API}/follow/Usercountfollowing`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ usercountfollowing: response.data });
        } catch (error) {
            console.error("Error fetching following count", error);
        }
    }
})); 
