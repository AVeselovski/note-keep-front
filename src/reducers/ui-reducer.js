import {
    VALIDATOR_EMAIL_ERROR,
    VALIDATOR_PASSWORD_ERROR,
    LOGGING_IN
} from '../utils/types';


const initialState = {
    loggingIn: false,
    emailError: '',
    passwordError: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case VALIDATOR_EMAIL_ERROR:
            return { ...state, emailError: action.payload };
        case VALIDATOR_PASSWORD_ERROR:
            return { ...state, passwordError: action.payload };
        case LOGGING_IN:
            return { ...state, loggingIn: !state.loggingIn };
        default:
            return state;
    }
};
