import express from 'express'


const router = express.Router()

router.get("/conversation/:receiverId", getConversation);

export default router