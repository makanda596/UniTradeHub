import axios from 'axios';
import { create } from 'zustand';

const API_BASE_URL = "http://localhost:5000/follow"; // Change this to your backend URL

export const FollowStore = create((set) => ({
    followers: [],
    following: [],
    isLoading: false,
    status:false,
    countfollowing: "",
    countfollowers: "",

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

    handleFollow: async(userId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Please log in to follow users.");
                return;
            }

            const response = await axios.post(
                `${API_BASE_URL}/followUser/${userId}`,
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

    countfollowersfunction: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_BASE_URL}/countfollowers`, {
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
            const response = await axios.get(`${API_BASE_URL}/countfollowing`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ countfollowing: response.data });
        } catch (error) {
            console.error("Error fetching following count", error);
        }
    }
}));
