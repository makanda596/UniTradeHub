 import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { MakeReview, getReview } from '../controllers/ReviewControllers.js';

 const router = express.Router()

router.post('/postReview/:receiverId ', verifyToken, MakeReview)
router.get('/getReview/:receiverId ', getReview)

 export default router;