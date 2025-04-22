import React, { useState } from 'react';

const WarningMessage = () => {
    const [show, setShow] = useState(true);

    if (!show) return null;

    return (
        <div className="absolute t-0 fixed  bg-yellow-100 text-yellow-800 border border-yellow-400 p-4 text-sm rounded-md mx-4 mt-4 text-center relative shadow">
            ⚠️ Please be aware of scammers! Do not purchase a product before verifying it.

            <button
                onClick={() => setShow(false)}
                className="absolute top-2 right-3 text-3xl text-yellow-800 hover:text-yellow-600 font-bold"
            >
                ×
            </button>
        </div>
    );
};

export default WarningMessage;
