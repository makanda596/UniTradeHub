import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { postFlash, getFlash,getUserFlash } from '../controllers/FlashController.js'

const router = express.Router()

router.post('/postFlash', verifyToken, postFlash)
router.get('/getFlash', verifyToken, getFlash)
router.get('/userFlash', verifyToken, getUserFlash)

export default router