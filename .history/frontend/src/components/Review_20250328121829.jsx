import Swal from "sweetalert2";

const ReviewForm = ({ recieverId }) => {
    const handleSubmit = async (text) => {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire("Unauthorized", "Please log in to submit a review.", "error");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/reviews/postReview/${recieverId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();
            Swal.fire(data.success ? "Success" : "Error", data.message, data.success ? "success" : "error");
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const openReviewPopup = () => {
        Swal.fire({
            title: "Leave a Review",
            input: "textarea",
            inputPlaceholder: "Write your review here...",
            showCancelButton: true,
            confirmButtonText: "Submit",
            preConfirm: (text) => {
                if (!text) {
                    Swal.showValidationMessage("Please enter a review");
                }
                return text;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(result.value);
            }
        });
    };

    return (
        <div className="text-center">
            <button
                onClick={openReviewPopup}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                Leave a Review
            </button>
        </div>
    );
};

export default ReviewForm;
