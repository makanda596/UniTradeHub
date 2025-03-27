import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { getConversation } from '../controllers/conversationControllers.js'
import { User } from '../models/userModels.js';

const router = express.Router()

router.get("/getconversation/:receiverId",verifyToken, getConversation);
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id) // Fetch only the username
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})
export default router