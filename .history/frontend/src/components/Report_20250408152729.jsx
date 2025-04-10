import React from 'react';
import { useAuthStore } from '../utilis/auth';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Report = ({ popUp, setPopUp }) => {
    const { recieverId } = useParams();
    const { reportUser } = useAuthStore();

    const reportFunction = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to report this user. This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, report!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await reportUser(recieverId);
                    setPopUp(false);
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
                <div className="fixed inset-0  flex items-centre justify-center z-50 backdrop-blur-xs">
                    <div className="bg-white p-4 rounded-xl h-44 shadow-2xl max-w-md w-full mx-4 transition-all duration-300 ease-out">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Report User</h3>
                        <p className="text-gray-600 mb-6">
                            Please confirm if you want to report this user. We'll review your report promptly.
                        </p>

                        <div className="flex justify-end space-x-4">
                           
                            <button
                                onClick={reportFunction}
                                className="px-6 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                            >
                                Report
                            </button>
                             <button
                                onClick={() => setPopUp(false)}
                                className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors duration-200"
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

export default Report;