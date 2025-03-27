import express from "express";
import cloudinary from "../utilis/cloudinary.js";
import Imag from "../models/ImagModel.js";

const router = express.Router();


// Route to upload an image
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Post from "../models/Post.js"; // Import your Post model



// Multer storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "uploads",
        format: async (req, file) => "jpg", // Change format if needed
        public_id: (req, file) => file.originalname.split(".")[0], // Use filename
    },
});

const upload = multer({ storage });

// Route to upload an image
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        // Check if the file exists
        if (!req.file) {
            return res.status(400).json({ error: "No image provided." });
        }

        // Get Cloudinary URL
        const imageUrl = req.file.path;

        // Save to database (only if needed)
        const newPost = new Post({ image: imageUrl });
        await newPost.save();

        res.status(200).json({
            message: "Image uploaded successfully!",
            imageUrl,
        });
    } catch (error) {
        console.error("❌ Image Upload Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});



export default router;
