import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaUserCircle, FaImage, FaPaperPlane, FaTimes } from "react-icons/fa"; // Import icons
import { useParams } from "react-router-dom";
import {formatMessageTime} from '../utilis/time'
import { useAuthStore } from "../utilis/auth";
import ChartHeader from "../components/ChartHeader";
export default function ChatCard({ user }) {
    const { recieverId } = useParams();
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState(null);
    const fileInputRef = useRef(null);
    const conversationEndRef= useRef(null)
    // const { onlineUsers } = useAuthStore()

    useEffect(()=>{
        if (conversationEndRef.current && conversations){
            conversationEndRef.current.scrollIntoView({behavior:"smooth"})
        }
    }, [conversations])
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
            console.log(res.data.conversation.messages.createdAt || []);
            console.log(res.data.conversation.messages || []);
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
            <ChartHeader user={user}/>

            {/* Chat Messages */}
            <div className="h-60 overflow-y-auto space-y-3 p-2">
                {conversations.map((conversation, index) => (
                    <div
                        key={index}
                        ref={conversationEndRef}
                        className={`flex ${conversation.senderId === user._id ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`${conversation.senderId === user._id
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                } p-3 rounded-lg max-w-xs`}
                        
                        >
                            {conversation.message}
                            {conversation.image && (
                                <img
                                    src={conversation.image}
                                    alt="Message"
                                    className="mt-2 rounded-lg"
                                    style={{ maxWidth: "100%" }}
                                />
                            )}
                        </div>
                        <div className="chat-header mb-1">
                            <>{conversation.recieverId}</>
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(conversation.createdAt)}
                            </time>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 w-full">
                {imagePreview && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                                type="button"
                            >
                                <FaTimes className="size-3" />
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={sendMessage} className="flex items-center gap-2">
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />

                        <button
                            type="button"
                            className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <FaImage size={20} />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-sm btn-circle"
                        disabled={!message.trim() && !imagePreview}
                    >
                        <FaPaperPlane size={22} />
                    </button>
                </form>
            </div>
        </div>
    );
}