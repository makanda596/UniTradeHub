import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaUserCircle, FaImage, FaPaperPlane, FaTimes } from "react-icons/fa"; // Import icons
import { useParams } from "react-router-dom";
import ChartHeader from "../components/ChartHeader";
import Conversation from "../components/Conversation";
import chartInput from '../components/chartInput'
export default function ChatCard({ user }) {
    const { recieverId } = useParams();
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState(null);
    const fileInputRef = useRef(null);
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
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file"); // Use alert instead of alert.error
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Remove image preview
    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

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
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() && !imagePreview) return;

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:5000/chart/sendMessage/${recieverId}`,
                { message, image: imagePreview },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchMessages(); // Refresh messages
            setMessage("");
            setImagePreview(null); // Clear image preview
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error.message);
        }
    };

    return (
        <div className="w-full bg-white shadow-lg rounded-xl p-4">
            {/* Chat Header */}
            <ChartHeader userinfo={userinfo} />

            <Conversation conversations={conversations} user={user} userinfo={userinfo }/>
           {/* Chat Input */}
           <chartInput/>
        </div>
    );
}