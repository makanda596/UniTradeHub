import axios from 'axios';
import {create} from 'zustand'

const API_BASE_URL = "http://localhost:5000/follow"; // Change this to your backend URL

export const FollowStore = create((set)=>({
    followers:null,

    fetchFollowers:async()=>{
       try{
           const token = localStorage.getItem("token")
           if (!token) {
               return console.log("please log in")
           }
           const response = await axios.get(`${API_BASE_URL}/getfollowers`, {
               headers: { Authorization: `Bearer ${token}` },
           });
            console.log(response.data.followers)

           set({ followers: response.data.followers })
       }catch(error){
           console.error("Error fetching followers", error);

       }
    }
}))