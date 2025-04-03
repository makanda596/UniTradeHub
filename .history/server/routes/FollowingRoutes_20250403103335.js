import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { FollowUser, getFollowers, getFollowing, UnfollowUser, countFollowers, countFollowing } from '../controllers/FolloweControllers.js';
import { Following } from '../models/Following.js';

const router = express.Router()

router.post('/followUser/:followedId', verifyToken, FollowUser)
router.get('/getfollowers', verifyToken, getFollowers)
router.get("/following", verifyToken, getFollowing);
router.delete('/unfollow/:followedId', verifyToken, UnfollowUser)
router.get('/countfollowers', verifyToken, countFollowers)
router.get('/countfollowing', verifyToken, countFollowing)
router.get('/checkFollowStatus/:userId',verifyToken, async (req, res) => {
    try {
        const followRelation = await Following.findOne({
            followerId: req.user.id,
            followedId: req.params.userId
        });

        res.json({
            isFollowing: !!followRelation,  // True if following exists
            isPending: followRelation ? !followRelation.status : false
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;  