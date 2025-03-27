import Message from "../models/Message.js"; // Import your Message model

export const getConversation = async (req, res) => {
    try {
        const senderId = req.user.id
        const {  receiverId } = req.params; // Extract IDs from request parameters

        // Find messages between the two users
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by time (oldest first)

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching conversation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
