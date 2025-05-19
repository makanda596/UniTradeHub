import express from 'express'
import { adminLogin,  getUsers, countUsers, oneUser,
    countPosts, profile, logout,getAllPosts, deletePost, checkAuth,
    countReports, getPostCategoryCounts, getUserWithMostFollowers,
    countReportedPosts, getReports, getReported, oneReport, getTopReviewer,
    suspendAccount, getAccounts, removeSuspended, countAccounts, getAlerts
} from '../controllers/adminControllers.js';
import { adminVerifyToken } from '../middleware/adminVerifyToken.js';
import { AdminloginValidation } from '../middleware/AdminloginValidation.js';
import { AdminrateLimiter } from '../middleware/AdminrateLimiter.js';
const router = express.Router()

router.post('/adminlogin', AdminloginValidation, AdminrateLimiter, adminLogin)
router.get('/getUsers', adminVerifyToken, getUsers)
router.get('/check-auth', adminVerifyToken, checkAuth)
router.get('/profile', adminVerifyToken, profile)
router.post('/logout', logout)
router.get('/countUsers', adminVerifyToken, countUsers)
router.get('/countPosts', adminVerifyToken, countPosts)
router.get('/countReportedPosts', adminVerifyToken, countReportedPosts)
router.get('/countReports', adminVerifyToken, countReports)
router.get("/categorycounts", adminVerifyToken, getPostCategoryCounts)
router.get('/mostfollowers', adminVerifyToken, getUserWithMostFollowers);
router.get('/oneUser/:userId', adminVerifyToken ,oneUser)
router.get("/topreviewer", adminVerifyToken,getTopReviewer);
router.get("/allposts", adminVerifyToken, getAllPosts);
router.delete("/deletePost/:postId", adminVerifyToken, deletePost)
router.get('/getReported', adminVerifyToken, getReported)
router.get('/getReports', adminVerifyToken, getReports)
router.get('/oneReport/:postId', adminVerifyToken,oneReport)
router.post("/suspend",adminVerifyToken,suspendAccount)
 router.get("/getSuspended",adminVerifyToken,getAccounts)
 router.delete('/removeSuspended',adminVerifyToken,removeSuspended)
router.get('/countAccounts', adminVerifyToken, countAccounts)
router.get('/getAlerts', adminVerifyToken, getAlerts)


export default router; 