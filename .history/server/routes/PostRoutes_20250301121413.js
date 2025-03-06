import express from "express";
import { createPost, getAllPosts } from "../controllers/postControllers.js";
import User from '../models/user.js'
import authenticateUser from '../middleware/authenticateUser.js'
const router = express.Router();

router.post("/createpost/:id",  createPost);
router.get("/allposts", getAllPosts);
router.get('/me',authenticateUser, async (req,res)=>{
res.send(req.user);
const user = await User.findOne({email:req.user})
return res.json({
    message:"useri infor",
    user:{
        id:user._id,
        email:user.email,
    }
})
})
export default router;

