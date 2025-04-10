// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import { useAuthStore } from '../utilis/auth';

// const ReportPost = ({ savepopUp, setSavePopUp, postId, postName }) => {
//     const [reason, setReason] = useState('');
//     const [error, setError] = useState('');
//     const {reportPost}= useAuthStore()

//     useEffect(() => {
//         if (savepopUp) {
//             setError('');
//             setReason('');
//         }
//     }, [savepopUp]);

//     const reportFunction = async () => {
//         if (!reason) {
//             setError('Please select a reason for reporting');
//             return;
//         }

//         try {
//             await reportPost( postId, reason )
//             Swal.fire({
//                 title: 'Report Submitted!',
//                 text: 'Thank you for your report. We will review it shortly.',
//             });
//             setSavePopUp(false);
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || error.message;
//             setError(errorMessage);
//             console.error('Report error:', error); 
//         }
//     };

//     return (
//         <div>
//             {savepopUp && (
//                 <div className="fixed inset-0  flex items-end justify-center z-50 ">
//                     <div className="bg-white p-4 rounded-none shadow-2xl max-w-md w-full mx-4 transition-all duration-300 ease-out">
//                         <h3 className="text-xl font-bold text-gray-800 mb-2">savePost{postName}</h3>

                      
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 onClick={() => setSavePopUp(false)}
//                                 className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors duration-200"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={reportFunction}
//                                 className="px-6 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
//                             >
//                                 Confirm Report
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ReportPost;