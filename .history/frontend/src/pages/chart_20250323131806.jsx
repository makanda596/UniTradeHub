    import axios from "axios";
    import { useEffect, useState } from "react";
    import { FaUserCircle } from "react-icons/fa";
    import { useParams } from "react-router-dom";

    export default function ChatCard({ user }) {
        const { recieverId } = useParams();
        const [message, setMessage] = useState("");
        const [conversation, setConversation] = useState()

        // Fetch messages whenever receiver changes

        // Fetch messages whenever receiver changes
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve token from local storage

                const res = await axios.get(`http://localhost:5000/conversation/getconversation/${recieverId}`, {
                    headers: { Authorization: `Bearer ${token}` } // Fixed headers typo and space issue
                });

                setConversation(res.data.conversation..messages || []);
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
                const token = localStorage.getItem("token"); // Retrieve token from local storage
                const response = await axios.post(
                    `http://localhost:5000/chart/sendMessage/${recieverId}`,
                    { message },
                    {
                        headers: { Authorization: `Bearer ${token}` } // Attach token
                    }
                );
                // console.log(response.data);
                setMessage("");
            } catch (error) {
                console.error("Error sending message:", error.response?.data || error.message);
            }
        };

        return (
            <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-4">
                {conversation.map((convo,index)=>{
                    return<div key={index}>
                        <h1>{convo.messages}</h1>
                    </div>
                })}
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
                    <div className="flex items-start">
                        <div className="bg-gray-200 text-gray-700 p-3 rounded-lg max-w-xs">
                            {message.message}
                        </div>
                    </div>

                    <div className="flex items-end justify-end">
                        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                            I'm doing great! What about you?
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-gray-200 text-gray-700 p-3 rounded-lg max-w-xs">
                            I'm good too! Just working on some projects.
                        </div>
                    </div>
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
