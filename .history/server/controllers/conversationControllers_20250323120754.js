import { Conversation } from "../models/conversationModel.js";

export const getConversation = async (req, res) => {
    try {
        const senderId = req.user?.id; // Ensure user ID exists
        const { receiverId } = req.params;

        console.log("Sender ID:", senderId);
        console.log("Receiver ID:", receiverId);

        if (!senderId || !receiverId) {
            return res.status(400).json({ error: "Invalid sender or receiver ID" });
        }

        const messages = await Conversation.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ createdAt: 1 });

        console.log("Fetched Messages:", messages); // Check if messages are retrieved

        res.status(200).json({ message: "Found", messages });
    } catch (error) {
        console.error("Error fetching conversation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
