import React from 'react';
import Card from './Card';


const CardContainer = ({ data }) => {
    return (
        <div className="card-container">
            {
                data.map((card, index) => <Card key={card._id} card={card} />)
            }
        </div>
    );
}

export default CardContainer;
