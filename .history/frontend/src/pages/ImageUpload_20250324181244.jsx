import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Preview before upload
    };

    // Handle upload
    const handleUpload = async () => {
        if (!image) {
            setError("Please select an image first.");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:5000/image/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setUploadedImageUrl(response.data.imageUrl);
        } catch (err) {
            setError("Image upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md w-96 mx-auto mt-10">
            <h2 className="text-lg font-bold">Upload an Image</h2>

            <input type="file" onChange={handleFileChange} className="border p-2 rounded-md" />

            {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />}

            <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>

            {uploadedImageUrl && (
                <div className="text-center">
                    <p className="font-semibold text-green-600">Uploaded Image:</p>
                    <img src={uploadedImageUrl} alt="Uploaded" className="w-40 h-40 object-cover rounded-lg mt-2" />
                    <p className="text-sm text-gray-500">{uploadedImageUrl}</p>
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ImageUpload;
