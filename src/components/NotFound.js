import React from 'react';
import { errorMessages as messages } from '../utils/messages';

// WIP

const NotFound = () => (
    <h2>{messages.notFoundError}</h2>
);

const AltNotFound = () => (
    <h4>{messages.notFoundError}</h4>
);


export { NotFound, AltNotFound };
