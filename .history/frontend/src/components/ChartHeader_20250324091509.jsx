import { useEffect, useState } from "react";

const ChatHeader = ({ receiverId }) => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${receiverId}`);
                if (!response.ok) throw new Error("User not found");
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error("Error fetching user:", error);
                setUsername("Unknown User"); // Default if error occurs
            }
        };

        if (receiverId) {
            fetchUser();
        }
    }, [receiverId]);

    return (
        <div className="chat-header">
            <h2>Chat with {username.username}</h2>
        </div>
    );
};

export default ChatHeader;
