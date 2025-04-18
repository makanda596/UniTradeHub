import { useEffect, useState } from "react";

const ChatHeader = ({ receiverId }) => {
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/conversation/${receiverId}`);
                if (!response.ok) throw new Error("User not found");
                const data = await response.json();
                setUser(data.username);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (receiverId) {
            fetchUser();
        }
    }, [receiverId]);

    return (
        <div className="chat-header">
            <h2>Chat with {user.username}</h2>
        </div>
    );
};

export default ChatHeader;
