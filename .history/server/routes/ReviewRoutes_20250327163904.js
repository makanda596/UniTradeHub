 import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { MakeReview, getReview, deleteReview, countReview } from '../controllers/ReviewControllers.js';

 const router = express.Router()

router.post('/postReview/:recieverId', verifyToken, MakeReview)
router.get('/getReview', getReview)
router.delete('/deleteReview/:id', deleteReview )
router.get('/countReviews', verifyToken, countReview)

 export default router;