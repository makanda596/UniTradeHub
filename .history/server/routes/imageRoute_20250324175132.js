import express from "express";
import cloudinary from "../utilis/cloudinary.js";
import Imag from "../models/ImagModel.js";

const router = express.Router();


// Route to upload an image
router.post("/upload", async (req, res) => {
    try {
        const { image,text } = req.body; // Expecting base64 or image URL

        if (!image) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(image);
        const newI = new Imag({
            text, image: uploadResponse.secure_url
        })
        res.status(201).json({ message: "Message sent successfully!", newI });

        
    } catch (error) {
        console.error("❌ Image Upload Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

export default router;
