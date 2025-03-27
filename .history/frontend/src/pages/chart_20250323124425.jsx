import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ChatCard({ user }) {
    const { receiverId } = useParams(); // Get receiver ID from URL
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([]);

    // Fetch messages - optimized with useCallback
    const fetchMessages = useCallback(async () => {
        if (!receiverId) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found");
                return;
            }

            const res = await axios.get(
                `http://localhost:5000/conversation/getconversation/${receiverId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setConversation(res.data?.conversation?.messages || []);
            console.log("Fetched Messages:", res.data);
        } catch (error) {
            console.error("Error fetching messages:", error.response?.data || error.message);
        }
    }, [receiverId]);

    // Fetch messages whenever receiverId changes
    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!receiverId) {
            console.error("Error: receiverId is undefined");
            return;
        }

        if (!message.trim()) return; // Prevent empty messages

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found");
                return;
            }

            console.log("Sending message to receiverId:", receiverId); // Debugging
            const response = await axios.post(
                `http://localhost:5000/chat/sendMessage/${receiverId}`,
                { message },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log("Message Sent:", response.data);
            setMessage(""); // Clear input
            fetchMessages(); // Refresh chat after sending message
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
                    <h2 className="text-lg font-semibold">{user?.email || "Unknown User"}</h2>
                    <p className="text-sm text-green-500">Online</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="h-60 overflow-y-auto space-y-3 p-2">
                {conversation.length > 0 ? (
                    conversation.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === user?._id ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-xs ${msg.sender === user?._id
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No messages yet.</p>
                )}
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
