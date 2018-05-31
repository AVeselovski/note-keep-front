import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import theme from '../theme';


const colorCode = {
    0: theme.blue,
    1: theme.green,
    2: theme.yellow,
    3: theme.red
}

const getDate = (d) => {
    const date = new Date(d).toLocaleDateString('fi', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return date;
}

const List = ({ items }) => {
    return (
        <ul className="list">
            {items.map((item) => <li key={item._id}>{item.name}</li>)}
        </ul>
    );
}

const CheckList = ({ items }) => {
    return (
        <ul className="checklist">
            {items.map((item) =>
                <li key={item._id}>
                    <Checkbox
                        label={item.name}
                        inputStyle={{}}
                        iconStyle={{ height: '22px', fill: theme.darkGrey, marginRight: '10px' }}
                        labelStyle={{ height: '22px', color: theme.darkGrey }}
                        style={{ height: '22px', marginBottom: '6px'}} />
                </li>
            )}
        </ul>
    );
}

const Card = ({ card }) => {
    getDate(card.duedate);

    return (
        <div className="card">
            <div
                className="card-header"
                style={{
                    borderColor: card.status !== 'archived' ? colorCode[card.priority] : theme.darkGrey
                }}>
                <span className="title">{card.title}</span>
                <i className="done-icon"></i>
            </div>
            <div className="card-body">
                {!!card.description && <span className="description">{card.description}</span>}
                {!!card.description && !!card.list && <br />}
                {!!card.list
                    ? card.list.checklist
                        ? <CheckList items={card.list.items} />
                        : <List items={card.list.items} />
                    : null}
            </div>
            <div className="card-footer">
                <span className="tag">{card.tag}</span>
                {card.duedate && <span className="date">{getDate(card.duedate)}</span>}
            </div>
        </div>
    );
}

export default Card;
