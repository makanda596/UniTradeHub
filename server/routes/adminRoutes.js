import express from 'express'
import { adminLogin, adminSignup, getUsers, countUsers, oneUser } from '../controllers/adminControllers.js';
import { adminVerifyToken } from '../middleware/adminVerifyToken.js';
const router = express.Router()

router.post('/adminlogin', adminLogin)
router.post('/adminsignup',adminSignup)
router.get('/getUsers', adminVerifyToken, getUsers)
router.get('/countUsers', adminVerifyToken, countUsers)
router.get('/oneUser/:userId', adminVerifyToken ,oneUser)

export default router;