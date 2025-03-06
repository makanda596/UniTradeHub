import express from "express";
import { createPost, getAllPosts } from "../controllers/postControllers.js";

const router = express.Router();

router.post("/createpost/:id",  createPost);
router.get("/allposts", getAllPosts);

export default router;

