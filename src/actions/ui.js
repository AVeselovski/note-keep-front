import {
    TOGGLE_MENU,
    SET_NOTIFICATION,
    DISMISS_NOTIFICATION
} from '../utils/constants';


export const toggleMenu = val => ({
    type: TOGGLE_MENU,
    payload: val
});

export const setNotification = (msg, type) => ({
    type: SET_NOTIFICATION,
    payload: { msg, type }
});

export const dismissNotification = () => ({
    type: DISMISS_NOTIFICATION
});
