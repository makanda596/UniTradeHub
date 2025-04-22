import React, { useState } from 'react';

const WarningMessage = () => {
    const [show, setShow] = useState(true);

    if (!show) return null;

    return (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 border border-yellow-400 p-4 text-sm rounded-md w-[90%] max-w-xl text-center shadow z-50">
            ⚠️ Please be aware of scammers! Do not purchase a product before verifying it.
            <button
                onClick={() => setShow(false)}
                className="absolute top-2 right-3 text-2xl text-yellow-800 hover:text-yellow-600 font-bold"
            >
                ×
            </button>
        </div>
    );
};

export default WarningMessage;
