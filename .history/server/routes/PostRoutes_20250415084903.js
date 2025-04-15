import express from "express";
import { createPost, getAllPosts, getUserPosts, getpost ,getOnePost } from "../controllers/postControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/createpost",verifyToken, createPost);
router.get("/allposts",verifyToken, getAllPosts);
router.get("/userposts/:id", getUserPosts);
router.get("/posts", getpost);
router.get('/Onepost/:postId', getOnePost )


export default router;

