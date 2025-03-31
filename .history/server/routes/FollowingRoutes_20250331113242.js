import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { FollowUser, getfollowers } from '../controllers/FolloweControllers.js';

const router = express.Router()

router.post('/followUser/:followedId',verifyToken, FollowUser)
router.get('/getfollowers', verifyToken, getfollowers)

export default router;