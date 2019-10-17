import React from 'react';
import Card from './Card';

const CardsContainer = ({ url, data, changeStatus, deleteNote = () => {} }) => {
    return (
        <div className="cards-container-wrapper">
            <div className="cards-container">
                {data.map((card, index) => (
                    <div key={card._id} className="card-container">
                        <Card
                            url={url}
                            card={card}
                            changeStatus={changeStatus}
                            deleteNote={deleteNote}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsContainer;
