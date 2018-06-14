import React from 'react';

const CloseIcon = ({ size = '30' }) => {
	return (
		<svg width={size} height={size}>
			<path d={`M0,${size} ${size},0`} strokeWidth="2" strokeLinecap="round" />
			<path d={`M0,0 ${size},${size}`} strokeWidth="2" strokeLinecap="round" />
		</svg>
	);
};

export default CloseIcon;
