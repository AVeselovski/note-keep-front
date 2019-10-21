import React from 'react';
import Card from './Card';

const CardsContainer = ({
    url,
    data,
    checkDisabled,
    changeStatus,
    deleteNote = () => {},
    onCheckItem = () => {},
}) => {
    return (
        <div className="cards-container-wrapper">
            <div className="cards-container">
                {data.map((card, index) => (
                    <div key={card._id} className="card-container">
                        <Card
                            url={url}
                            card={card}
                            checkDisabled={checkDisabled}
                            changeStatus={changeStatus}
                            deleteNote={deleteNote}
                            onCheckItem={onCheckItem}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsContainer;
