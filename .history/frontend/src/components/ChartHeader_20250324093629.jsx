import axios from "axios";
import { useEffect, useState } from "react";

const ChatHeader = ({ recieverId }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`http://localhost:5000/conversation/${recieverId}`,{
                    headers:{Authorization:`Bearer ${token}`}
                });
                setUser(response.data);
            } catch (error) {
                console.log("Error fetching user:", error.message);
            }
        };

       
            fetchUser();
    }, [recieverId]);

    return (
        <div className="chat-header">
            <h2>Chat with {user?.username}</h2>
        </div>
    );
};

export default ChatHeader;
