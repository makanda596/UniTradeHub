import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ChatCard() {
    const { recieverId } = useParams();
    const [message, setMessage] = useState("");
    const [conversations, setConversations] = useState([]);
const [user ,setUser] = useState(null)


  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/auth/profile/${recieverId }`);
          setUser(response.data.user);
          console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, []);
    // Fetch messages whenever receiver changes
    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage

            const res = await axios.get(`http://localhost:5000/conversation/getconversation/${recieverId}`, {
                headers: { Authorization: `Bearer ${token}` } // Fixed headers typo and space issue
            });

            setConversations(res.data.conversation.messages || []);
            console.log(res.data.conversation.messages);
            console.log(res.data.conversation.participants);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [recieverId]); // Add recieverId to dependency array to fetch messages when receiver changes

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await axios.post(
                `http://localhost:5000/chart/sendMessage/${recieverId}`,
                { message },
                {
                    headers: { Authorization: `Bearer ${token}` } // Attach token
                }
            );
            // After sending the message, fetch the latest messages
            fetchMessages();
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
                    <h2 className="text-lg font-semibold">user{user?.username}</h2>
                    <h2 className="text-lg font-semibold">{recieverId}</h2>
                    <p className="text-sm text-green-500">Online</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="h-60 overflow-y-auto space-y-3 p-2">
                {conversations.map((conversation, index) => (
                    <div
                        key={index}
                        className={`flex ${conversation.senderId === user._id ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`${conversation.senderId === user._id
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                                } p-3 rounded-lg max-w-xs`}
                        >
                            {conversation.message}
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