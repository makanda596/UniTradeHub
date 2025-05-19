import React from 'react';

const ErrorMessage = ({ error = "Something went wrong." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto">
            <p className="text-red-600 font-semibold text-lg mb-2">Error</p>
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Retry
            </button>
        </div>
    );
};

export default ErrorMessage;
