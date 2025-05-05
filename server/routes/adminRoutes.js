import express from 'express'
import { adminLogin, adminSignup, getUsers, countUsers, oneUser, getAllPosts, deletePost, getReports, getReported, oneReport } from '../controllers/adminControllers.js';
import { adminVerifyToken } from '../middleware/adminVerifyToken.js';
const router = express.Router()

router.post('/adminlogin', adminLogin)
router.post('/adminsignup',adminSignup)
router.get('/getUsers', adminVerifyToken, getUsers)
router.get('/countUsers', adminVerifyToken, countUsers)
router.get('/oneUser/:userId', adminVerifyToken ,oneUser)
router.get("/allposts", adminVerifyToken, getAllPosts);
router.delete("/deletePost/:postId", adminVerifyToken, deletePost)
router.get('/getReported', adminVerifyToken, getReported)
router.get('/getReports', adminVerifyToken, getReports)
router.get('/oneReport/:postId', adminVerifyToken,oneReport)

export default router;