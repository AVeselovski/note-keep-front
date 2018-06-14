import React from 'react';
import { errorMessages as errorMsg } from '../utils/messages';

const NotFound = () => (
	<div className="not-found">
		<h2>404</h2>
		<h3>Page Not Found</h3>
		<h4>{errorMsg.notFoundError}</h4>
	</div>
);

const NotFoundAlt = () => (
	<div className="not-found-alt">
		<h4>{errorMsg.notFoundError}</h4>
	</div>
);

export { NotFound, NotFoundAlt };
