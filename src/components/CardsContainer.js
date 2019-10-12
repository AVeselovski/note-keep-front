import React from 'react';
import Card from './Card';

const CardsContainer = ({ data }) => {
    return (
        <div className="cards-container-wrapper">
            <div className="cards-container">
                {data.map((card, index) => (
                    <div className="card-container">
                        <Card key={card._id} card={card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsContainer;
