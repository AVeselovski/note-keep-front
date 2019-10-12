import React from 'react';
import Card from './Card';

const CardsContainer = ({ data, changeStatus }) => {
    return (
        <div className="cards-container-wrapper">
            <div className="cards-container">
                {data.map((card, index) => (
                    <div key={card._id} className="card-container">
                        <Card card={card} changeStatus={changeStatus} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsContainer;
