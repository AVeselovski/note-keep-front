import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    PASSWORD_CONFIRM_CHANGED
} from '../utils/types';

const initialState = {
    email: '',
    password: '',
    confirmPassword: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case PASSWORD_CONFIRM_CHANGED:
                return { ...state, confirmPassword: action.payload };
        default:
            return state;
    }
};
