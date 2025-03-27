import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ChatCard({ user }) {
    const { recieverId } = useParams();
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState("");
    const [conversations, setConversations] = useState([]);
const [users ,setUsers] = useState()
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            alert.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/auth/profile/${recieverId }`);
          setUsers(response.data.user);
          console.log(response.data.user);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, []);
    // Fetch messages whenever receiver changes
    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage

            const res = await axios.get(`http://localhost:5000/conversation/getconversation/${recieverId}`, {
                headers: { Authorization: `Bearer ${token}` } // Fixed headers typo and space issue
            });

            setConversations(res.data.conversation.messages || []);
            console.log(res.data.conversation.messages);
            console.log(res.data.conversation.participants);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [recieverId]); // Add recieverId to dependency array to fetch messages when receiver changes

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() && !imagePreview) return;

        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await axios.post(
                `http://localhost:5000/chart/sendMessage/${recieverId}`,
                { message, image: imagePreview, },
                {
                    headers: { Authorization: `Bearer ${token}` } // Attach token
                }
            );
            // After sending the message, fetch the latest messages
            fetchMessages();
            setMessage("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
        
                
    );
}