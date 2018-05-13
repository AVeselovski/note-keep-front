import React from 'react';
// import { CloseIcon } from './icons'


const getDate = (d) => {
    const date = new Date(d).toLocaleDateString('fi', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return date;
}

const Card = ({ card }) => {
    getDate(card.duedate);
    return (
        <div className="card">
            <div className="card-head">
                <span className="title">{card.title}</span>
                <i className="done-icon"></i> 
            </div>
            <div className="card-body">
                {card.description}   
            </div>
            <div className="card-footer">
                <span className="tag">{card.tag}</span>
                {card.duedate && <span className="date">{getDate(card.duedate)}</span>}
            </div>
        </div>
    );
}

export default Card;
