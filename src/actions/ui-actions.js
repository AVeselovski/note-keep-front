import {
    VALIDATOR_EMAIL_ERROR,
    VALIDATOR_PASSWORD_ERROR,
    LOGGING_IN
} from '../utils/types';

export const setEmailError = emailError => ({
    type: VALIDATOR_EMAIL_ERROR,
    payload: emailError
});

export const setPasswordError = passwordError => ({
    type: VALIDATOR_PASSWORD_ERROR,
    payload: passwordError
});

export const setLoggingIn = () => ({
    type: LOGGING_IN
});
