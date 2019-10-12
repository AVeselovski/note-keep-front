import React from 'react';
import { errorMessages as errorMsg } from '../utils/messages';

const NotFound = () => (
    <div className="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>{errorMsg.notFoundError}</p>
    </div>
);

const NotFoundAlt = () => (
    <div className="not-found-alt">
        <h1>404</h1>
        <p>{errorMsg.notFoundError}</p>
    </div>
);

export { NotFound, NotFoundAlt };
