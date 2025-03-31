import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router()

router.post('/followUser',verifyToken, FollowUser)

export default router;