 import express from 'express'
import { verifyToken } from '../middleware/verifyToken';

 const router = express.Router()

 router.post('/postReview',verifyToken, MakeReview)

 export default router;