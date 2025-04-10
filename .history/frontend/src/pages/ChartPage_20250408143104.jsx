import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Conversation from '../components/Conversation';
import { Link, useParams } from 'react-router-dom';

const ChatPage = () => {
    const { id: receiverId } = useParams();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [image, setImage] = useState(null);
    
    const fetchMessages = async (receiverId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/conversation/getconversation`,
                { receiverId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setConversations(res.data.messages || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/getUsers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
            console.log(import.meta.env.VITE_BACKEND_URL);
            if (response.data.length > 0) {
                const initialUser = receiverId ?
                    response.data.find(u => u._id === receiverId) || response.data[0] :
                    response.data[0];
                setSelectedUser(initialUser._id);
                fetchMessages(initialUser._id);
            }
            setError(null);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if ((!newMessage.trim() && !image) || !selectedUser) return;

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append('message', newMessage);
            formData.append('receiverId', selectedUser);
            if (image) {
                formData.append('image', image);
            }

            await axios.post(
                `${import.meta.env.VITE_CONVERSATION}/chart/sendmessage`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setNewMessage('');
            setImage(null);
            fetchMessages(selectedUser);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (receiverId && users.length > 0) {
            const userExists = users.some(u => u._id === receiverId);
            if (userExists) {
                setSelectedUser(receiverId);
                fetchMessages(receiverId);
            }
        }
    }, [receiverId, users]);

    const filteredUsers = users.filter(user => {
        const name = user?.username?.toString().toLowerCase() || '';
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
            <div className="w-full lg:w-1/4 bg-gray-100 p-4 overflow-y-auto flex flex-col">
                <h2 className="text-xl font-bold mb-4">Chats</h2>

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
                           <Link to={ `/Chart/${user?._id}`} target='_blank' ><div
                                key={user._id}
                                onClick={() => {
                                    setSelectedUser(user._id);
                                    fetchMessages(user._id);
                                }}
                                className={`p-3 rounded-lg cursor-pointer transition ${selectedUser === user._id ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-white hover:bg-gray-50'} mb-2`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={user?.profilepic || 'https://via.placeholder.com/40'}
                                        alt={user.username || 'User'}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{user?.username || 'Unknown User'}</p>
                                    </div>
                                  
                                </div>
                            </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center p-4 text-gray-500">
                            {users.length === 0 ? 'No users available' : `No users found matching "${searchTerm}"`}
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Section (Main Content) */}
            <div className="flex-1 lg:flex flex-col hidden">
              
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <p className="text-gray-500">Select a user to start chatting</p>
                    </div>
            </div>
        </div>
    );
};

export default ChatPage;