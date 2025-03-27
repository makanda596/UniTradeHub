import axios from "axios";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ChartHeader from "../components/ChartHeader";
import Conversation from "../components/Conversation";
import chartInput from '../components/chartInput'
export default function ChatCard({ user }) {
    const { recieverId } = useParams();
   
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState(null);
 
        const [userinfo, setUserinfo] = useState(null);
    
    // const { onlineUsers } = useAuthStore()

        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const token = localStorage.getItem("token")
                    const response = await axios.get(`http://localhost:5000/conversation/${recieverId}`,{
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    setUserinfo(response.data);
                } catch (error) {
                    console.log("Error fetching user:", error.message);
                }
            };
    
           
                fetchUser();
        }, [recieverId]);
    

    
    // Handle image selection
 

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/auth/profile/${recieverId}`);
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };

        fetchUserData();
    }, [recieverId]);

    // Fetch messages
    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/conversation/getconversation/${recieverId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setConversations(res.data.conversation.messages || []);
         
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [recieverId]);

    // Send message
   

    return (
        <div className="w-full bg-white shadow-lg rounded-xl p-4">
            {/* Chat Header */}
            <ChartHeader userinfo={userinfo} />

            <Conversation conversations={conversations} user={user} userinfo={userinfo }/>
           {/* Chat Input */}
            < chartInput />
        </div>
    );
}