import React from 'react';

const ArrowIcon = ({ small = false }) => {
    if (!!small)
        return (
            <svg width="18" height="18">
                <path
                    d="M3,11 9,5 15,11"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
        );

    return (
        <svg width="28" height="28">
            <path d="M3,20 14,9 25,20" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
};

export default ArrowIcon;
