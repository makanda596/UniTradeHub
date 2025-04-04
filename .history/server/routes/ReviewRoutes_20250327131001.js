 import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { MakeReview } from '../controllers/ReviewControllers.js';

 const router = express.Router()

router.post('/postReview/:recieverId',verifyToken, MakeReview)

 export default router;