import {
    SET_VALIDATOR_EMAIL_ERROR,
    SET_VALIDATOR_CONFIRM_EMAIL_ERROR,
    SET_VALIDATOR_PASSWORD_ERROR,
    SET_VALIDATOR_CONFIRM_PASSWORD_ERROR,
    SET_IS_AUTHORIZED
} from "../utils/constants";


const initialState = {
    isAuthorized: false,
    emailError: '',
    confirmEmailError: '',
    passwordError: '',
    confirmPasswordError: ''
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
        case SET_IS_AUTHORIZED:
            return { ...state, isAuthorized: action.payload };
        default:
            return state;
    }
};
