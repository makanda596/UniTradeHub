import express from "express";
import { createPost, getAllPosts } from "../controllers/postControllers.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.post("/createpost", authenticateUser, createPost);
router.get("/all", getAllPosts);

export default router;

