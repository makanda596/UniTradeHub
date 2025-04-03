import axios from 'axios'; 
import { create } from 'zustand';

const FOLLOW_API = import.meta.env.VITE_BACKEND_URL


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

    fetchFollowers: async () => {
        try {
            const token = localStorage.getItem("token");  
            if (!token) return console.log("Please log in");

            const response = await axios.get(`${FOLLOW_API}/follow/getfollowers`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ followers: response.data.followers });
        } catch (error) {
            console.error("Error fetching followers", error);
        }
    },

    fetchFollowing: async (userId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${FOLLOW_API}}/follow/following/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(userId)
            set({ following: response.data.following });
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

    handleUnfollow: async (followedId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${FOLLOW_API}/follow/unfollow/${followedId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Refresh the following list
            set((state) => ({
                following: state.following.filter((user) => user.followedId._id !== followedId),
            }));
        } catch (error) {
            console.error("Error unfollowing user", error);
        }
    },

    countfollowersfunction: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${FOLLOW_API}/follow/countfollowers`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ countfollowers: response.data });
        } catch (error) {
            console.error("Error fetching followers count", error);
        }
    }, 

    countfollowingfunction: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${FOLLOW_API}/follow/countfollowing`, {
                headers: { Authorization: `Bearer ${token}` },
            });

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
