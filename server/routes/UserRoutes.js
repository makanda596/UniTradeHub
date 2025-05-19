import express from 'express'
import {
  signup, login, logout, getUsers, 
  addToCart, removeFromCart,
  profile, updateUser, deleteUser, checkAuth, 
  EmailVerification, EmailVerificationResend,
  userprofile, usergetposts, countUserPost,
deletePost,resetPassword,
 forgotPassword} from '../controllers/userControllers.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { rateLimiter } from '../middleware/rateLimiter.js'
import { validateSignup } from '../middleware/validateSignup.js'
import { loginValidationRules } from '../middleware/loginValidator.js'

const router = express.Router()

router.post('/signup', validateSignup, signup)
router.post('/login', loginValidationRules,rateLimiter, login)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword);
router.post('/ResetPassword/:token', resetPassword);
router.post("/email-verification", EmailVerification)
router.post('/resendcode', EmailVerificationResend) 
router.get('/getUsers', verifyToken, getUsers)
router.get('/check-auth', verifyToken, checkAuth)
router.get("/userposts", verifyToken, usergetposts );
router.get('/countposts',verifyToken, countUserPost); 
router.delete("/delete/:postId", verifyToken , deletePost);
router.get('/profile', verifyToken,profile)
router.put('/update/:id' ,updateUser) 
router.delete('/delete',verifyToken, deleteUser)
router.get('/profile/:id', userprofile)
router.post("/addcart/:postId", verifyToken, addToCart);
router.post("/removecart/:postId", verifyToken , removeFromCart);

export default router 