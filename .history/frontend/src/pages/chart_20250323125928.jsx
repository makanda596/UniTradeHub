import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ChatCard({ user }) {
    const { recieverId } = useParams();
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([]);

    // Fetch messages whenever receiver changes
    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage

            const res = await axios.get('http://localhost:5000/conversation/getconversation/67dfbf2b0dbac3a89e4fe87e', {
                headers: { Authorization: `Bearer ${token}` } // Fixed headers typo and space issue
            });

            setConversation(res.data.conversation || []);
            console.log(res.data.conversation);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        if (recieverId) {
            fetchMessages();
        }
    }, [recieverId]); // Added recieverId as a dependency

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await axios.post(
                `http://localhost:5000/chat/sendMessage/${recieverId}`,
                { message },
                {
                    headers: { Authorization: `Bearer ${token}` } // Attach token
                }
            );
            console.log(response.data);
            setMessage("");
            fetchMessages(); // Fetch messages again to update UI
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
                {conversation.length > 0 ? (
                    conversation.map((msg, index) => (
                        <div key={index} className={`flex ${msg.senderId === user?._id ? "justify-end" : "justify-start"}`}>
                            <div className={`p-3 rounded-lg max-w-xs ${msg.senderId === user?._id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
                                {msg.message}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No messages yet.</p>
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
