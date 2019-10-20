import React from 'react';
import { NavLink } from 'react-router-dom';
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
        display: 'flex',
        marginBottom: '6px',
    },
    iconStyle: {
        height: '22px',
        fill: theme.darkGrey,
        marginRight: '10px',
    },
    labelStyle: {
        alignItems: 'center',
        color: theme.darkGrey,
        display: 'flex',
        lineHeight: '14px',
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
        <ul className="card-body__list">
            {items.map(item => (
                <li key={item._id}>
                    <span className="bullet">•</span>
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

const CheckList = ({ items }) => {
    return (
        <ul className="card-body__checklist">
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

const Card = ({ url, card, changeStatus, deleteNote }) => {
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
                <NavLink
                    className="card-header__title"
                    to={`${url}/edit/${card._id}`}
                >
                    {card.title}
                </NavLink>
                <div className="card-header__icon-container">
                    {card.status === 'archived' && (
                        <button
                            className="icon return-icon"
                            onClick={() =>
                                changeStatus({
                                    id: card._id,
                                    status: 'active',
                                })
                            }
                        >
                            <ArrowAltIcon />
                        </button>
                    )}
                    {card.status === 'active' ? (
                        card.priority === 0 ? (
                            <button
                                className="icon archive-icon"
                                onClick={() =>
                                    changeStatus({
                                        id: card._id,
                                        status: 'archived',
                                    })
                                }
                            >
                                <ArchiveIcon />
                            </button>
                        ) : (
                            <button
                                className="icon done-icon"
                                onClick={() =>
                                    changeStatus({
                                        id: card._id,
                                        status: 'archived',
                                    })
                                }
                            >
                                <CheckIcon />
                            </button>
                        )
                    ) : (
                        <button
                            className="icon remove-icon"
                            onClick={() => deleteNote({ id: card._id })}
                        >
                            <CloseIcon />
                        </button>
                    )}
                </div>
            </div>
            <div className="card-body">
                {!!card.description && (
                    <p className="card-body__description">{card.description}</p>
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
                <span className="card-footer__tag">{card.tag}</span>
                {card.duedate && (
                    <span className="card-footer__date">
                        {getDate(card.duedate)}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Card;
