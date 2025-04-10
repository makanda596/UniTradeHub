import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../utilis/auth';

const ReportPost = ({ popUp, setPopUp, postId, postName }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const {reportPost}= useAuthStore()

    useEffect(() => {
        if (popUp) {
            setError('');
            setReason('');
        }
    }, [popUp]);

    const reportFunction = async () => {
        if (!reason) {
            setError('Please select a reason for reporting');
            return;
        }

        try {
            await reportPost( postId, reason )
            Swal.fire({
                icon: 'success',
                title: 'Report Submitted!',
                text: 'Thank you for your report. We will review it shortly.',
            });
            setPopUp(false);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            console.error('Report error:', error);
        }
    };

    return (
        <div>
            {popUp && (
                <div className="fixed inset-0  flex items-end justify-center z-50 ">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transition-all duration-300 ease-out">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Report Post</h3>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        <p className="text-gray-600 mb-4">
                            Why are you reporting the post <strong>"{postName}"</strong>?
                        </p>

                        <select
                            value={reason}
                            required
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full mb-6 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Select a reason --</option>
                            <option value="Inappropriate content">Inappropriate content</option>
                            <option value="Harassment or bullying">Harassment or bullying</option>
                            <option value="Spam or misleading">Spam or misleading</option>
                            <option value="Violence or threat">Violence or threat</option>
                            <option value="Other">Other</option>
                        </select>

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