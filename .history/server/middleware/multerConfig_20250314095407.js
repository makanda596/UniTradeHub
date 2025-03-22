import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the "pics" folder exists
const uploadDir = path.join(__dirname, "../pics"); // Ensure correct folder path
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if it does not exist
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Use the correct absolute path
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file
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

// Multer upload configuration
const upload = multer({ storage, fileFilter });

export const upload;
