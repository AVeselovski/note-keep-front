import { LOG_IN, IS_LOGGED_IN } from '../utils/types';

export const login = credentials => ({
    type: LOG_IN,
    payload: credentials
});

export const isLoggedIn = () => ({
    type: IS_LOGGED_IN
});
