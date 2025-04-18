import axios from 'axios';
import { create } from 'zustand';

const FOLLOW_API = import.meta.env.VITE_BACKEND_URL


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

            const response = await axios.get(`${FOLLOW_API}/getfollowers`, {
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
            const response = await axios.get(`${FOLLOW_API}}/following`, {
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
                `${FOLLOW_API}/followUser/${userId}`,
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
            await axios.delete(`${FOLLOW_API}/unfollow/${followedId}`, {
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
            const response = await axios.get(`${FOLLOW_API}/countfollowers`, {
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
            const response = await axios.get(`${FOLLOW_API}/countfollowing`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ countfollowing: response.data });
        } catch (error) {
            console.error("Error fetching following count", error);
        }
    }
}));
