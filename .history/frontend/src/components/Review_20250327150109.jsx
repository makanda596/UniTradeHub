import axios from "axios";
import { useState } from "react";

const ReviewForm = ({ recieverId }) => {
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            // const token = localStorage.getItem("token")
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGZlMjczMjU4Mzc5ZjIxMzFjMzc5NyIsImlhdCI6MTc0MzA3NTc0OSwiZXhwIjoxNzQzMTYyMTQ5fQ.HohsAheBTx6jxVxoeGHDEdnZ3sJD66Hq6fbRkq5X8Bk';
            const response = await axios.post(`http://localhost:5000/reviews/postReview/${recieverId}`, {
                headers: {Authorization: `Bearer ${token}`}, text

            });

            const data = await response.json();

            if (data.success) {
                setMessage("Review posted successfully!");
                setText("");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Leave a Review</h2>
            {message && <p className="text-sm text-red-500 mb-2">{message}</p>}
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Write your review..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <button
                    type="submit"
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
