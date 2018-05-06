import { call, put, takeEvery } from 'redux-saga/effects';
import {
    SET_STATUS_LOGGING_IN,
    SET_STATUS_AUTHORIZED,
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    TOGGLE_MENU,
    SET_NOTIFICATION
} from '../utils/constants';
import { apiLogin, apiRegister } from '../api/auth';
import {
    errorMessages as errorMsg,
    notificationMessages as notify
} from '../utils/messages';


function* login(action) {
    const { credentials, history } = action.payload;

    try {
        const response = yield call(apiLogin, credentials);

        yield put({ type: SET_STATUS_LOGGING_IN, payload: false });
        yield put({ type: SET_STATUS_AUTHORIZED, payload: true });
        // store token
        localStorage.setItem('token', response.data.token);
        // redirect
        history.push('/dashboard');
    } catch (error) {
        yield put({ type: SET_STATUS_LOGGING_IN, payload: false });

        let customError = errorMsg.genericResponseError;
        if (error.response.status === 401) {
            customError = errorMsg.wrongCredentialsError;
        }
        // notify error
        yield put({ type: SET_NOTIFICATION, payload: { msg: customError, type: 'error' } });
    }
}

export function* watchLogin() {
    yield takeEvery(LOGIN_USER, login);
}


function* register(action) {
    const { credentials, history } = action.payload;

    try {
        const response = yield call(apiRegister, credentials);

        yield put({ type: SET_STATUS_LOGGING_IN, payload: false });
        yield put({ type: SET_STATUS_AUTHORIZED, payload: true });
        // store token
        localStorage.setItem('token', response.data.token);
        // notify
        yield put({ type: SET_NOTIFICATION, payload: { msg: notify.registerSuccess, type: 'success' } });
        // redirect
        history.push('/dashboard');
    } catch (error) {
        yield put({ type: SET_STATUS_LOGGING_IN, payload: false });

        let customError = errorMsg.genericResponseError;
        if (error.response.status === 422) {
            customError = error.response.data;
        }
        // notify error
        yield put({ type: SET_NOTIFICATION, payload: { msg: customError, type: 'error' } });
    }
}

export function* watchRegister() {
    yield takeEvery(REGISTER_USER, register);
}


function* logout(action) {
    try {
        // destroy token
        localStorage.removeItem('token');

        yield put({ type: SET_STATUS_AUTHORIZED, payload: false });
        yield put({ type: TOGGLE_MENU, payload: false });
    } catch (error) {
        console.log(error);
    }
}

export function* watchLogout() {
    yield takeEvery(LOGOUT_USER, logout);
}
