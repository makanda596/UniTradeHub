
import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: 467638961983671,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
