import {
    SET_VALIDATOR_EMAIL_ERROR,
    SET_VALIDATOR_PASSWORD_ERROR,
    SET_STATUS_LOGGING_IN,
    LOGIN_USER,
    LOGOUT_USER
} from '../utils/constants';


export const setValidatorEmailError = emailError => ({
    type: SET_VALIDATOR_EMAIL_ERROR,
    payload: emailError
});

export const setValidatorPasswordError = passwordError => ({
    type: SET_VALIDATOR_PASSWORD_ERROR,
    payload: passwordError
});

export const setStatusLoggingIn = val => ({
    type: SET_STATUS_LOGGING_IN,
    payload: val
});


// init login flow
export const loginUser = (credentials, history) => ({
    type: LOGIN_USER,
    payload: { credentials, history }
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});
