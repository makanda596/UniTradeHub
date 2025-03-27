import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ChatCard({ user }) {
    const { recieverId } = useParams();
    const [message, setMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const currentUserId = localStorage.getItem("userId"); // Assuming user ID is stored in localStorage

    // Fetch messages whenever receiver changes
    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(`http://localhost:5000/conversation/getconversation/${recieverId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setConversations(res.data.conversation.messages || []);
            console.log(res.data.conversation.messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `http://localhost:5000/chat/sendMessage/${recieverId}`, // Fixed "chart" typo
                { message },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setConversations((prev) => [...prev, response.data.message]); // Add new message to UI
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error.message);
        }
    };

    return (
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-4">
            {/* Chat Header */}
            <div className="flex items-center border-b pb-2 mb-3">
                <FaUserCircle size={40} className="text-gray-400" />
                <div className="ml-3">
                    <h2 className="text-lg font-semibold">{user?.email}</h2>
                    <h2 className="text-lg font-semibold">{user?._id}</h2>
                    <p className="text-sm text-green-500">Online</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="h-60 overflow-y-auto space-y-3 p-2">
                {conversations.map((conv, index) => (
                    <div
                        key={index}
                        className={`flex ${conv.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`p-3 rounded-lg max-w-xs ${
                                conv.senderId === currentUserId
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {conv.message}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <div className="mt-3 flex items-center border-t pt-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Type a message..."
                />
                <button
                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition duration-200"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
