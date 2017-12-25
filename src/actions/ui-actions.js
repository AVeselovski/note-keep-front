import {
    VALIDATOR_EMAIL_ERROR,
    VALIDATOR_PASSWORD_ERROR
} from '../utils/types';

export const validatorEmailError = emailError => ({
    type: VALIDATOR_EMAIL_ERROR,
    payload: emailError
});

export const validatorPasswordError = passwordError => ({
    type: VALIDATOR_PASSWORD_ERROR,
    payload: passwordError
});
