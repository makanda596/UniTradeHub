import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Heart, CheckCircle } from "lucide-react"

const SavePost = () => {
    const { postId } = useParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem("token");
            // Mock the axios.post request since we don't have the actual backend here.
            // Replace this with your actual axios call.
            const mockResponse = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate a successful response after 500ms
                    //   resolve({ status: 200, data: { message: "Post saved successfully" } });

                    // Simulate an error response (e.g., post already exists)
                    reject({
                        response: {
                            status: 400,
                            data: { message: "Post already exists in the cart" }
                        }
                    });
                }, 500);
            });

            if (mockResponse.status === 200) {
                setSuccess(true); // Set success state
                setError(""); // Clear any previous error
                // You might want to show a success message to the user here.
                console.log("Post saved successfully");
            }

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to save post. Please try again."); // generic error
            }
            setSuccess(false);
        }
    };

    return (
        <div className="flex items-center">
            <Button
                onClick={handleSaveClick}
                className={`
          w-40 px-4 py-2 rounded-md transition duration-300 flex items-center justify-center gap-2
          ${success
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-white text-gray-800 hover:bg-red-500 hover:text-white border border-red-500"
                    }
        `}
                disabled={success} // Disable button after successful save
            >
                {success ? (
                    <>
                        <CheckCircle className="w-5 h-5" />
                        Saved!
                    </>
                ) : (
                    <>
                        <Heart className="w-5 h-5" />
                        Save Post
                    </>
                )}
            </Button>
            {error && (
                <Alert variant="destructive" className="ml-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default SavePost;

