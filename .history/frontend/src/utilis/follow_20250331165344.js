import axios from 'axios';
import { create } from 'zustand';

const API_BASE_URL = "http://localhost:5000/follow"; // Change this to your backend URL

export const FollowStore = create((set) => ({
    followers: [], // Ensure it's an array
    following: [], // Ensure it's an array
    isLoading: false,
    countfollowing:"",

    fetchFollowers: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return console.log("Please log in");

            const response = await axios.get(`${API_BASE_URL}/getfollowers`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ followers: response.data.followers });
        } catch (error) {
            console.error("Error fetching followers", error);
        }
    },

    fetchFollowing: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_BASE_URL}/following`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ following: response.data.following });
        } catch (error) {
            console.error("Error fetching following", error);
        }
    },

    handleUnfollow: async (followedId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_BASE_URL}/unfollow/${followedId}`, {
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

    countFollwers: async()=>{
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_BASE_URL}/countfollowing`, {
                headers: { Authorization: `Bearer ${token}` },
                
            });
            set({ countfollowing: response.data });

        } catch (error) {
            console.error("Error fetching following", error);
        }
    }
}));
