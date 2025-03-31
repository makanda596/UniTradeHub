import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { FollowUser } from '../controllers/FolloweControllers.js';

const router = express.Router()

router.post('/followUser/:id',verifyToken, FollowUser)

export default router;