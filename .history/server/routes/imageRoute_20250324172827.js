import express from "express";
import cloudinary from "cloudinary";

const router = express.Router();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: "your_cloud_name",
    api_key: "your_api_key",
    api_secret: "your_api_secret",
});

// Route to upload an image
router.post("/upload", async (req, res) => {
    try {
        const { image } = req.body; // Expecting base64 or image URL

        if (!image) {
            return res.status(400).json({ error: "No image provided." });
        }

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.v2.uploader.upload(image, {
            folder: "uploads",
        });

        res.status(200).json({
            message: "Image uploaded successfully!",
            imageUrl: uploadResponse.secure_url,
        });
    } catch (error) {
        console.error("❌ Image Upload Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

export default router;
