import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { IS_LOGGED_IN, LOGGING_IN, LOG_IN } from '../utils/types';


function* login(action) {
    let credentials = action.payload;
    console.log(credentials);
    yield call(delay, 2000);
    yield put({ type: IS_LOGGED_IN });
    yield put({ type: LOGGING_IN });
}

export default function* rootSaga() {
    yield takeEvery(LOG_IN, login);
}
