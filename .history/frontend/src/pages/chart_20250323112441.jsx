import { FaPaperPlane } from "react-icons/fa"; // Font Awesome send icon

export default function MessageForm({ sendMessage, newMessage, setNewMessage }) {
    return (
        <div className="flex items-center bg-white border-t p-3 shadow-md rounded-b-lg">
            {/* Message Input */}
            <input
                type="text"
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />

            {/* Send Button */}
            <button
                className="ml-3 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition duration-200 flex items-center justify-center"
                onClick={sendMessage}
            >
                <FaPaperPlane size={18} />
            </button>
        </div>
    );
}
