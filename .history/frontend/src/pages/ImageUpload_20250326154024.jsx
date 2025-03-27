import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [error, setError] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result); // Convert to base64
            };
        }
    };

    const handleUpload = async () => {
        if (!image) {
            setError("Please select an image first.");
            return;
        }

        setError("");

        try {
            const response = await axios.post("http://localhost:5000/image/upload", { image });

            setUploadedImageUrl(response.data.imageUrl);
            alert("Image uploaded successfully!"); // ✅ Show success alert
        } catch (err) {
            setError("Image upload failed. Please try again.");
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {uploadedImageUrl && (
                <div>
                    <p style={{ color: "green" }}>Image uploaded successfully!</p>
                    <img src={uploadedImageUrl} alt="Uploaded" style={{ width: "300px" }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
