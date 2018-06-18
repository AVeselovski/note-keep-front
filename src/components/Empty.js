import React from 'react';
import PropTypes from 'prop-types';

const Empty = ({ message }) => (
	<div className="empty-container">
		<div className="circle">
			<div>
				<h4 key="msg">{message}</h4>
			</div>
		</div>
	</div>
);

Empty.propTypes = {
	message: PropTypes.string.isRequired
};

export default Empty;
