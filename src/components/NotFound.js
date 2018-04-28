import React from 'react';
import { errorMessages as messages } from '../utils/messages';


const NotFound = () => (
    <h2>{messages.notFoundError}</h2>
);

const AltNotFound = () => (
    <div className='not-found-alt'>
        <h4>{messages.notFoundError}</h4>
    </div>
);

export { NotFound, AltNotFound };
