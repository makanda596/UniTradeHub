import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatApp() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ id: "12345", username: "CurrentUser" }); // Mock authenticated user

    useEffect(() => {
        fetchUsers();
        fetchConversations();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/auth/getUsers");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const fetchConversations = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/conversations");
            setConversations(res.data);
        } catch (error) {
            console.error("Error fetching conversations", error);
        }
    };

    const startConversation = async (receiverId) => {
        try {
            // Check if conversation exists
            let conversation = conversations.find(conv =>
                conv.participants.includes(user.id) && conv.participants.includes(receiverId)
            );

            if (!conversation) {
                // Create new conversation
                const res = await axios.post("http://localhost:5000/api/conversations", {
                    senderId: user.id,
                    receiverId
                });
                conversation = res.data;
                setConversations([...conversations, conversation]);
            }

            setSelectedConversation(conversation._id);
            setSelectedUser(receiverId);
            fetchMessages(conversation._id);
        } catch (error) {
            console.error("Error starting conversation", error);
        }
    };

    const fetchMessages = async (conversationId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/messages/${conversationId}`);
            setMessages(res.data);
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const res = await axios.post(`http://localhost:5000/api/messages/${selectedConversation}`, {
                senderId: user.id,
                receiverId: selectedUser,
                message: newMessage
            });
            setMessages([...messages, res.data.newMessage]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                {users.map((userItem) => (
                    <div
                        key={userItem._id}
                        className="p-3 bg-white mb-2 rounded cursor-pointer"
                        onClick={() => startConversation(userItem._id)}
                    >
                        <h3>{userItem?.username}</h3>
                    </div>
                ))}
            </div>

            {/* Chat Box */}
            <div className="w-2/3 flex flex-col p-4">
                {selectedConversation ? (
                    <>
                        <h2 className="text-lg font-bold">{users.find(u => u._id === selectedUser)?.username}</h2>
                        <div className="flex-1 overflow-y-auto border p-4">
                            {messages.map((msg) => (
                                <div key={msg._id} className={`p-2 my-2 rounded w-fit ${msg.senderId === user.id ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300'}`}>
                                    {msg.message}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex">
                            <input
                                type="text"
                                className="flex-1 p-2 border rounded"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={sendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-500">Select a user to start chatting</div>
                )}
            </div>
        </div>
    );
}
