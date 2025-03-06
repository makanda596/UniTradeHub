import express from "express";
import { createPost, getAllPosts } from "../controllers/postControllers.js";

const router = express.Router();

router.post("/createpost/Lid",  createPost);
router.get("/all", getAllPosts);

export default router;

