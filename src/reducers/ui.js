import {
    TOGGLE_MENU,
    SET_NOTIFICATION,
    DISMISS_NOTIFICATION
} from "../utils/constants";


const initialState = {
    menuOpen: false,
    notificationMsg: '',
    notificationType: 'error'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return { ...state, menuOpen: action.payload };
        case SET_NOTIFICATION:
            return {
                ...state,
                notificationMsg: action.payload.msg,
                notificationType: action.payload.type
            };
        case DISMISS_NOTIFICATION:
            return { ...state, notificationMsg: '' };
        default:
            return state;
    }
};
