import express from 'express'
import {
    signup, login, logout, getUsers, addToCart, removeFromCart, getCart,
     profile, updateUser, deleteUser, checkAuth,
      userprofile, usergetposts, countUserPost,deletePost  } from '../controllers/userControllers.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { User } from '../models/userModels.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getUsers', getUsers)
router.get('/check-auth', verifyToken, checkAuth)
 router.get("/userposts/:id", usergetposts );
router.get('/countposts/:id', countUserPost);
router.delete("/delete/:postId", verifyToken , deletePost);
// router.get('/getUser', getUser)
router.get('/profile', verifyToken,profile)
router.put('/update/:id' ,updateUser) 
router.delete('/delete/:id', deleteUser)
router.get('/profile/:id', userprofile)
router.post("/addcart/:postId", verifyToken, addToCart);
router.post("/removecart/:postId", verifyToken , removeFromCart);
router.get("/getCart", verifyToken, getCart); // Fetch cart items
router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id) // Fetch only the username
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }})
export default router