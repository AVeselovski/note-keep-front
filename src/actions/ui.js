import {
    TOGGLE_MENU,
    SET_NOTIFICATION,
    DISMISS_NOTIFICATION,
    SET_STATUS_LOGGING_IN,
    SET_STATUS_FETCHING_RESOURCES,
} from '../utils/constants';

export const toggleMenu = val => ({
    type: TOGGLE_MENU,
    payload: val,
});

export const setNotification = (msg, type) => ({
    type: SET_NOTIFICATION,
    payload: { msg, type },
});

export const dismissNotification = () => ({
    type: DISMISS_NOTIFICATION,
});

export const setStatusLoggingIn = val => ({
    type: SET_STATUS_LOGGING_IN,
    payload: val,
});

export const setStatusFetchingResources = val => ({
    type: SET_STATUS_FETCHING_RESOURCES,
    payload: val,
});
