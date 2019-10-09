import { call, put, takeEvery, select } from 'redux-saga/effects';
import { apiSaveNote } from '../api/note';
import {
    SAVE_NOTE,
    GET_RESOURCES,
    SET_STATUS_FETCHING_RESOURCES,
    SET_NOTIFICATION,
} from '../utils/constants';
import { errorMessages as errorMsg } from '../utils/messages';

export const getNote = state => state.note;

function* save(action) {
    const history = action.payload;
    const note = yield select(getNote);

    try {
        const response = yield call(apiSaveNote, note);

        yield put({ type: SET_STATUS_FETCHING_RESOURCES, payload: true });

        // redirect
        note.priority === 0
            ? history.push('/dashboard/notes')
            : history.push('/dashboard/tasks');

        yield put({ type: GET_RESOURCES });
    } catch (error) {
        // log error, not temp
        console.log(error);

        let customError = errorMsg.genericResponseError;
        // notify error
        yield put({
            type: SET_NOTIFICATION,
            payload: { msg: customError, type: 'error' },
        });
    }
}

export function* watchSaveNote() {
    yield takeEvery(SAVE_NOTE, save);
}
