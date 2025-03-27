import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatHeader = () => {
    const [user, setUser] = useState(null);
    const { receiverId }=useParams()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/conversation/${receiverId}`);
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Error fetching user:", error.message);
            }
        };

       
            fetchUser();
    }, [receiverId]);

    return (
        <div className="chat-header">
            <h2>Chat with {user.username}</h2>
        </div>
    );
};

export default ChatHeader;
