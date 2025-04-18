import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Conversation from '../components/Conversation';
import { useParams } from 'react-router-dom';

const ChatPage = ({user}) => {
        const { recieverId } = useParams();
    
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
        // const [message, setMessage] = useState("");
        const [conversations, setConversations] = useState([]);

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

    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/auth/getUsers");
            setUsers(response.data);
            console.log(response.data);
            if (response.data.length > 0) {
                setSelectedUser(response.data[0].id);
            }
            setError(null);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // const handleSendMessage = () => {
    //     if (newMessage.trim() === '' || !selectedUser) return;

    //     const newMsg = {
    //         id: userConversations[selectedUser].length + 1,
    //         sender: 'me',
    //         text: newMessage,
    //         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    //     };

    //     userConversations[selectedUser].push(newMsg);
    //     setNewMessage('');
    // };

    // Filter users based on search term with null checks
    const filteredUsers = users.filter(user => {
        const name = user?.name?.toString().toLowerCase() || '';
        const email = user?.email?.toString().toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        return name.includes(search) || email.includes(search);
    });

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading users...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">Error: {error}</div>
                <button
                    onClick={fetchUsers}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            {/* Users Section (Left Sidebar) */}
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto flex flex-col">
                <h2 className="text-xl font-bold mb-4">Chats</h2>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <svg
                        className="absolute left-2.5 top-3 h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <div
                                key={user._id}
                                onClick={() => setSelectedUser(user._id)}
                                className={`p-3 rounded-lg cursor-pointer transition ${selectedUser === user._id ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-white hover:bg-gray-50'} mb-2`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={user?.profilepic || 'https://via.placeholder.com/40'}
                                        alt={user.name || 'User'}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{user?.username || 'Unknown User'}</p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {userConversations[user.id]?.[userConversations[user.id]?.length - 1]?.text || 'No messages yet'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-4 text-gray-500">
                            {users.length === 0 ? 'No users available' : `No users found matching "${searchTerm}"`}
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Section (Main Content) */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        {/* Chat header */}
                        <div className="bg-white p-4 border-b flex items-center">
                            <img
                                src={users.find(u => u._id === selectedUser)?.profilepic || 'https://via.placeholder.com/40'}
                                alt="User"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <h2 className="font-bold">
                                    {users.find(u => u._id === selectedUser)?.username || 'Unknown User'}
                                </h2>
                                <p className="text-xs text-gray-500">Online</p>
                            </div>
                        </div>

                        <Conversation conversations={conversations} user={user} />
                        {/* Messages area */}
                        {/* <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                            <div className="space-y-4">
                                {userConversations[selectedUser]?.map((message) => (
                                    <div
                                        key={message._id}
                                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-white border'}`}
                                        >
                                            <p>{message.text}</p>
                                            <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                {message.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                       
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <p className="text-gray-500">Select a user to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;