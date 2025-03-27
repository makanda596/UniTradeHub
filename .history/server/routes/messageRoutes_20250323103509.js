import express from 'express'
import { sendMessage } from '../controllers/messageController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router()

router.post('/sendMessage/:recieverId',verifyToken,sendMessage)

export default router;