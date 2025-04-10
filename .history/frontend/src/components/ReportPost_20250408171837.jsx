import React, { useState } from 'react';
import { useAuthStore } from '../utilis/auth';
import Swal from 'sweetalert2';

const ReportPost = ({ popUp, setPopUp, post }) => {
    const [reason, setReason] = useState('');
    const { reportPost } = useAuthStore();
    console.log(post._id)

    const reportFunction = async () => {
        if (!reason.trim()) {
            return Swal.fire({
                icon: 'warning',
                title: 'Reason Required',
                text: 'Please select or write a reason for reporting.',
                confirmButtonColor: '#3b82f6',
            });
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to report this post. This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, report!',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await reportPost(post, reason);
                    setPopUp(false);
                    setReason('');
                    Swal.fire({
                        icon: 'success',
                        title: 'Report Submitted!',
                        text: 'Thank you for helping keep our community safe.',
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
                <div className="fixed inset-0 flex items-end justify-center z-50 bg-black bg-opacity-30">
                    <div className="bg-white p-4 shadow-2xl max-w-md w-full mx-4 rounded-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Report Post</h3>
                        <p className="text-gray-600 mb-2">Please select a reason for reporting:</p>

                        <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full mb-4 p-2 border border-gray-300 rounded"
                        >
                            <option value="">-- Select Reason --</option>
                            <option value="Inappropriate Content">Inappropriate Content</option>
                            <option value="Harassment or bullying">Harassment or bullying</option>
                            <option value="Spam or misleading">Spam or misleading</option>
                            <option value="Violence or threat">Violence or threat</option>
                            <option value="Other">Other</option>
                        </select>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={reportFunction}
                                className="px-6 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                            >
                                Report
                            </button>
                            <button
                                onClick={() => setPopUp(false)}
                                className="px-6 py-2 rounded-lg font-medium bg-gray-400 text-white hover:bg-gray-100 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportPost;
