import express from "express";
import { createPost, getAllPosts } from "../controllers/postControllers.js";
import {User} from '../models/userModels.js'
import {authenticateUser} from '../middleware/authenticateUser.js'
const router = express.Router();

router.post("/createpost/:id",  createPost);
router.get("/allposts", getAllPosts);
router.get('/me',authenticateUser, async (req,res)=>{
const user = await User.findOne({email:req.user})
return res.json({
    message:"useri infor",
    user
})

})
export default router;

