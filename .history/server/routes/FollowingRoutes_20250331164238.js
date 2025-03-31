import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { FollowUser, getFollowers, getFollowing, UnfollowUser, countFollowers, countFollowing } from '../controllers/FolloweControllers.js';

const router = express.Router()

router.post('/followUser/:followedId', verifyToken, FollowUser)
router.get('/getfollowers', verifyToken, getFollowers)
router.get("/following", verifyToken, getFollowing);
router.delete('/unfollow/:followedId', verifyToken, UnfollowUser)
router.get('/countfollowers', verifyToken, countFollowers)
router.get('/countfollowing', verifyToken, countFollowing)

export default router;