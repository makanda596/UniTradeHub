import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { getAllPosts } from "../controllers/postControllers.js";

const router = express.Router();

router.post("/create", authenticateUser, createPost);
router.get("/all", getAllPosts);

export default router;

