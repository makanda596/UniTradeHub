import React from 'react';
import { useAuthStore } from '../utilis/auth';
import Swal from 'sweetalert2';

const ReportPost = ({ popUp, setPopUp, postId, postName }) => {
    const { reportPost } = useAuthStore();

    const reportFunction = async () => {
        Swal.fire({
            title: `Report "${postName}"?`,
            text: "You are about to report this post. This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, report!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await reportPost(postId);
                    setPopUp(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Post Reported!',
                        text: 'Thank you for helping maintain community standards.',
                        confirmButtonColor: '#3b82f6',
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Report Failed',
                        text: error.message || 'Something went wrong. Please try again.',
                        confirmButtonColor: '#3b82f6',
                    });
                }
            }
        });
    };

    return (
        <div>
            {popUp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transition-all duration-300 ease-out">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Report Post</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to report the post "{postName}"?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setPopUp(false)}
                                className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={reportFunction}
                                className="px-6 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                            >
                                Confirm Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportPost;