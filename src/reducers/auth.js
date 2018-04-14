import {
    SET_VALIDATOR_EMAIL_ERROR,
    SET_VALIDATOR_CONFIRM_EMAIL_ERROR,
    SET_VALIDATOR_PASSWORD_ERROR,
    SET_VALIDATOR_CONFIRM_PASSWORD_ERROR,
    SET_STATUS_LOGGING_IN,
    SET_STATUS_AUTHORIZED,
    SET_RESPONSE_ERROR
} from "../utils/constants";


const initialState = {
    statusLoggingIn: false,
    statusAuthorized: false,
    emailError: '',
    passwordError: '',
    responseError: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_VALIDATOR_EMAIL_ERROR:
            return { ...state, emailError: action.payload };
        case SET_VALIDATOR_CONFIRM_EMAIL_ERROR:
            return { ...state, confirmEmailError: action.payload };
        case SET_VALIDATOR_PASSWORD_ERROR:
            return { ...state, passwordError: action.payload };
        case SET_VALIDATOR_CONFIRM_PASSWORD_ERROR:
            return { ...state, confirmPasswordError: action.payload };
        case SET_STATUS_LOGGING_IN:
            return { ...state, statusLoggingIn: action.payload };
        case SET_STATUS_AUTHORIZED:
            return { ...state, statusAuthorized: action.payload };
        case SET_RESPONSE_ERROR:
            return { ...state, responseError: action.payload };
        default:
            return state;
    }
};
