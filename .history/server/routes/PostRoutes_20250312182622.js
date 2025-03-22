import express from "express";
import { createPost, getAllPosts, getUserPosts } from "../controllers/postControllers.js";
import {authenticateUser} from '../middleware/authenticateUser.js'
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/createpost/:id",   createPost);
router.get("/allposts", getAllPosts);
router.get("/userposts", getUserPosts);
router.get('/me',authenticateUser, async (req,res)=>{
    res.json({ message: "User is authenticated", user: req.user });
// const user = await User.findOne({email:req.user})
// return res.json({
//     message:"useri infor",
//     user:{
//         id:user._id, 
//         email:user.email,
//         username:user.username,
//         phoneNumber:user.phoneNumber,
//     }
// })

})
export default router;

