 import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { MakeReview, getReview ,deleteReview } from '../controllers/ReviewControllers.js';

 const router = express.Router()

router.post('/postReview/:recieverId', verifyToken, MakeReview)
router.get('/getReview/:recieverId', getReview)
router.delete('/deleteReview/:id', deleteReview )

 export default router;