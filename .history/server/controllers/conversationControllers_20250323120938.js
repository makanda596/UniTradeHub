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

        // Find the conversation between these two users
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate({
            path: "messages",
            populate: { path: "sender", select: "email" } // Get sender details
        });

        if (!conversation) {
            return res.status(404).json({ message: "No conversation found" });
        }

        console.log("Fetched Conversation:", conversation); // Debugging

        res.status(200).json({ message: "Conversation found", conversation });
    } catch (error) {
        console.error("Error fetching conversation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
