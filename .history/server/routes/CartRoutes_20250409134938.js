import express from 'express'
import { verifyToken } from '../middleware/verifyToken'

const router = express.Router()

router.post('/addCart/:postId', verifyToken,addCart)

export default router;