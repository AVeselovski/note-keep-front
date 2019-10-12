import { call, put, takeLatest, select } from 'redux-saga/effects';
import { apiSaveNote, apiChangeStatus } from '../api/note';
import {
    SAVE_NOTE,
    SAVE_NOTE_STATUS,
    FETCH_RESOURCES,
    SET_STATUS_FETCHING_RESOURCES,
    SET_NOTIFICATION,
} from '../utils/constants';
import { errorMessages as errorMsg } from '../utils/messages';

export const getNote = state => state.note;

function* save(action) {
    const history = action.payload;
    const note = yield select(getNote);

    try {
        yield call(apiSaveNote, note);

        yield put({ type: SET_STATUS_FETCHING_RESOURCES, payload: true });

        // redirect
        note.priority === 0
            ? history.push('/dashboard/notes')
            : history.push('/dashboard/tasks');

        yield put({ type: FETCH_RESOURCES });
    } catch (error) {
        // log error
        console.log(error);

        // notify error
        let customError = errorMsg.genericResponseError;
        yield put({
            type: SET_NOTIFICATION,
            payload: { msg: customError, type: 'error' },
        });
    }
}

function* changeStatus(action) {
    const { id, status } = action.payload;

    try {
        yield call(apiChangeStatus, id, status);
        yield put({ type: SET_STATUS_FETCHING_RESOURCES, payload: true });
        yield put({ type: FETCH_RESOURCES });
    } catch (error) {
        // log error
        console.log(error);

        // notify error
        let customError = errorMsg.genericResponseError;
        yield put({
            type: SET_NOTIFICATION,
            payload: { msg: customError, type: 'error' },
        });
    }
}

export function* watchSaveNote() {
    yield takeLatest(SAVE_NOTE, save);
}
export function* watchChangeStatus() {
    yield takeLatest(SAVE_NOTE_STATUS, changeStatus);
}
