import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { ArrowAltIcon, CheckIcon, ArchiveIcon, CloseIcon } from './icons';
import theme from '../theme';

const colorCode = {
    0: theme.darkerBlue,
    1: theme.darkerGreen,
    2: theme.darkerYellow,
    3: theme.darkerRed,
};

const checkboxStyles = {
    rootStyle: {
        height: '22px',
        marginBottom: '6px',
    },
    iconStyle: {
        height: '22px',
        fill: theme.darkGrey,
        marginRight: '10px',
    },
    labelStyle: {
        height: '22px',
        color: theme.darkGrey,
    },
};

const getDate = d => {
    const date = new Date(d).toLocaleDateString('fi', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return date;
};

const List = ({ items }) => {
    return (
        <ul className="list">
            {items.map(item => (
                <li key={item._id}>{item.name}</li>
            ))}
        </ul>
    );
};

const CheckList = ({ items }) => {
    return (
        <ul className="checklist">
            {items.map(item => (
                <li key={item._id}>
                    <Checkbox
                        label={item.name}
                        checked={item.checked}
                        iconStyle={checkboxStyles.iconStyle}
                        labelStyle={checkboxStyles.labelStyle}
                        style={checkboxStyles.rootStyle}
                    />
                </li>
            ))}
        </ul>
    );
};

const Card = ({ card }) => {
    getDate(card.duedate);

    return (
        <div className="card">
            <div
                className="card-header"
                style={{
                    borderColor:
                        card.status !== 'archived'
                            ? colorCode[card.priority]
                            : theme.darkGrey,
                }}
            >
                <span className="title">{card.title}</span>
                <div className="icon-container">
                    {card.status === 'archived' && (
                        <button className="icon return-icon">
                            <ArrowAltIcon />
                        </button>
                    )}
                    {card.status === 'active' ? (
                        card.priority === 0 ? (
                            <button className="icon archive-icon">
                                <ArchiveIcon />
                            </button>
                        ) : (
                            <button className="icon done-icon">
                                <CheckIcon />
                            </button>
                        )
                    ) : (
                        <button className="icon remove-icon">
                            <CloseIcon />
                        </button>
                    )}
                </div>
            </div>
            <div className="card-body">
                {!!card.description && (
                    <p className="description">{card.description}</p>
                )}
                {!!card.description && !!card.list && card.list.items.length ? (
                    <br />
                ) : null}
                {!!card.list && card.list.items.length ? (
                    card.list.checklist ? (
                        <CheckList items={card.list.items} />
                    ) : (
                        <List items={card.list.items} />
                    )
                ) : null}
            </div>
            <div className="card-footer">
                <span className="tag">{card.tag}</span>
                {card.duedate && (
                    <span className="date">{getDate(card.duedate)}</span>
                )}
            </div>
        </div>
    );
};

export default Card;
