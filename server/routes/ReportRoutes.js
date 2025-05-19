import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { makeReport, postReport } from '../controllers/reportControllers.js';

const router = express.Router()

router.post('/makeReport/:reportedId', verifyToken, makeReport)
router.post('/postReport/:postId', verifyToken, postReport)

export default router; 