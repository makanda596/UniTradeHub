import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Conversation from '../components/Conversation';
import { useParams, useNavigate } from 'react-router-dom';

const ChatPage = ({ user = {} }) => {
    const { id: receiverId } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [image, setImage] = useState(null);

    // Create axios instance with default headers
    const api = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });

    const fetchMessages = async (receiverId) => {
        try {
            const res = await api.post('/conversation/getconversation', { receiverId });
            setConversations(res.data.messages || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate('/login');
            }
        }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/auth/getUsers');
            setUsers(res.data);
            
            if (res.data.length > 0) {
                const initialUser = receiverId ?
                    res.data.find(u => u._id === receiverId) || res.data[0] :
                    res.data[0];
                setSelectedUser(initialUser._id);
                fetchMessages(initialUser._id);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error.response?.data?.message || "Failed to fetch users");
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if ((!newMessage.trim() && !image) || !selectedUser) return;

        try {
            const formData = new FormData();
            formData.append('message', newMessage);
            formData.append('receiverId', selectedUser);
            if (image) {
                formData.append('image', image);
            }

            await api.post('/conversation/sendmessage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setNewMessage('');
            setImage(null);
            fetchMessages(selectedUser);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // ... rest of your component code remains the same ...