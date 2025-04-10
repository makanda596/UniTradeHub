import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { addCart, countCart, removeCart } from '../controllers/cartControllers.js';
import { getCart } from '../controllers/userControllers.js';

const router = express.Router()

router.post('/addCart/:postId', verifyToken, addCart)
router.get('/getCart', verifyToken, getCart)
router.get('/countCart', verifyToken, countCart)
router.delete('/removeCart/:postId', verifyToken, removeCart)

export default router;