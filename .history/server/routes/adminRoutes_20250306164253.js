import express from 'express'
import { adminsignup } from '../controllers/adminControllers.js'
const router = express.Router()

// router.post('adminlogin', adminlogin)
router.post('/adminsignup',adminsignup)

export default router;