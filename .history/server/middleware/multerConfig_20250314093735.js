import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save files in the "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file to prevent conflicts
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, PNG, and JPG formats are allowed!"), false);
    }
};

// Set up Multer middleware
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});
