import React from 'react';

const CloseIcon = ({ small = false }) => {
    if (!!small)
        return (
            <svg width="18" height="18">
                <path d="M3,15 15,3" strokeWidth="3" strokeLinecap="round" />
                <path d="M3,3 15,15" strokeWidth="3" strokeLinecap="round" />
            </svg>
        );

    return (
        <svg width="28" height="28">
            <path d="M5,23 23,5" strokeWidth="3" strokeLinecap="round" />
            <path d="M5,5 23,23" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
};

export default CloseIcon;
