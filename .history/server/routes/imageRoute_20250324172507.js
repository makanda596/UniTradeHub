import express from "express";
import { uploadImage } from "../controllers/imageController.js";

const router = express.Router();

// Route to upload an image
router.post("/upload", uploadImage);

export default router;
