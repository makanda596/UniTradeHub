import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get `__dirname` equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the "pics" folder exists
const uploadDir = path.join(__dirname, "../pics"); // Absolute path to "pics" folder

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if not exists
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save images to "pics" folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
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

// Multer upload middleware
export const upload = multer({ storage, fileFilter });

