import { call, put, takeEvery } from 'redux-saga/effects';
import {
    SET_STATUS_LOGGING_IN,
    SET_STATUS_AUTHORIZED,
    LOGIN_USER,
    SET_RESPONSE_ERROR,
    LOGOUT_USER
} from '../utils/constants';
import { apiLogin } from '../api/auth';
import { errorMessages as messages } from '../utils/messages';


function* login(action) {
    const { credentials, history } = action.payload;

    try {
        const res = yield call(apiLogin, credentials);

        yield put({ type: SET_STATUS_LOGGING_IN, payload: false });
        yield put({ type: SET_STATUS_AUTHORIZED, payload: true });
        // clear response error
        yield put({ type: SET_RESPONSE_ERROR, payload: '' });
        // store token
        localStorage.setItem('token', res.data.token);
        // redirect
        history.push('/dashboard');
    } catch (err) {
        yield put({ type: SET_STATUS_LOGGING_IN, payload: false });

        let error = messages.genericResponseError;
        if (err.response.status === 401) {
            error = messages.wrongCredentialsError;
        }

        yield put({ type: SET_RESPONSE_ERROR, payload: error });
    }
}

export function* watchLogin() {
    yield takeEvery(LOGIN_USER, login);
}


function* logout(action) {
    try {
        // destroy token
        localStorage.removeItem('token');

        yield put({ type: SET_STATUS_AUTHORIZED, payload: false });
    } catch (err) {
        console.log(err);
    }
}

export function* watchLogout() {
    yield takeEvery(LOGOUT_USER, logout);
}
