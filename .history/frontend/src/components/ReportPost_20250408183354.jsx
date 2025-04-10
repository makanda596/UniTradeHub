import React, { useState } from 'react';
import { useAuthStore } from '../utilis/auth';
import Swal from 'sweetalert2';

const ReportPost = ({ popUp, setPopUp, postId, postName }) => {
    const { reportPost,error } = useAuthStore();
    const [reason, setReason] = useState('');
    const [localError, setLocalError] = useState('');


    const reportFunction = async () => {
    
   try {
    await reportPost(postId,reason)
        } catch (error) {
            const msg = error.response?.data?.message || 'Error reporting post';
            setLocalError(msg);
        }

    };


    return (
        <div>
            {popUp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transition-all duration-300 ease-out">

                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Report Post</h3>
                        {error && <>{error}</>}
                        <p className="text-gray-600 mb-4">
                            err{localError && (
                                <div className="text-red-500 font-medium mb-4">
                                   error {localError}
                                </div>
                            )}

                            Why are you reporting the post <strong>"{postName}"</strong>?
                        </p>

                        <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full mb-6 p-2 border border-gray-300 rounded"
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
