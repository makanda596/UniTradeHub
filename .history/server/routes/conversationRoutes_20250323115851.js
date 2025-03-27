import express from 'express'
import { verifyToken } from '../middleware/verifyToken';
import { getConversation } from '../controllers/conversationControllers.js'

const router = express.Router()

router.get("/conversation/:receiverId",verifyToken, getConversation);

export default router