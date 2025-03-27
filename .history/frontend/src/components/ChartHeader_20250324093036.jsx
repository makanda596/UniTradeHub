import axios from "axios";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const ChatHeader = () => {
    const [user, setUser] = useState(null);
    // const { receiverId:"/67dfbe7dff5fd30219896f1c"}=useParams()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get('http://localhost:5000/conversation/67dfbe7dff5fd30219896f1c',{
                    headers:{`Bearer ${token}`}
                });
                setUser(response.data);
                console.log(response.data.user);
            } catch (error) {
                console.log("Error fetching user:", error.message);
            }
        };

       
            fetchUser();
    }, []);

    return (
        <div className="chat-header">
            <h2>Chat with {user?.username}</h2>
        </div>
    );
};

export default ChatHeader;
