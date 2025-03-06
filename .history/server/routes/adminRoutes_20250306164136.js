import express from 'express'
import { adminsignup,adminlogin } from '../controllers/adminControllers'
const router = express.Router()

router.post('adminlogin', adminlogin)
router.post('/adminsignup',adminsignup)

export default router;