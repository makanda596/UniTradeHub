import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { countReports, makeReport } from '../controllers/reportControllers.js';

const router = express.Router()

router.post('/makeReport/:reportedId', verifyToken, makeReport)
router.get('/countReport/:id', , countReports)

export default router;