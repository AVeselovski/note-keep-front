import {
    TOGGLE_MENU,
    SET_NOTIFICATION,
    RESET_NOTIFICATION,
    SET_STATUS_LOGGING_IN,
    SET_PROCESSING,
    VERSION_NUMBER,
} from '../utils/constants';

const initialState = {
    version: '',
    menuOpen: false,
    notificationMsg: '',
    notificationType: 'error',
    statusLoggingIn: false,
    processing: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case VERSION_NUMBER:
            return { ...state, version: action.payload };
        case TOGGLE_MENU:
            return { ...state, menuOpen: action.payload };
        case SET_NOTIFICATION:
            return {
                ...state,
                notificationMsg: action.payload.msg,
                notificationType: action.payload.type,
            };
        case RESET_NOTIFICATION:
            return { ...state, notificationMsg: '' };
        case SET_STATUS_LOGGING_IN:
            return { ...state, statusLoggingIn: action.payload };
        case SET_PROCESSING:
            return { ...state, processing: action.payload };
        default:
            return state;
    }
};
