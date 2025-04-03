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

            // Refresh the following list
            set((state) => ({
                following: state.following.filter((user) => user.userId._id !== userId),
            }));
        } catch (error) {
            console.error("Error unfollowing user", error);
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
