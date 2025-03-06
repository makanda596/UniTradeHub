import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateUser, createPost);
router.get("/all", getAllPosts);

export default router;

