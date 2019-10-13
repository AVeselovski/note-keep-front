import { call, put, takeLatest, select } from 'redux-saga/effects';
import { formatTag } from '../utils/helpers';
import { apiSaveNote, apiChangeStatus, apiDeleteNote } from '../api/note';
import {
    SAVE_NOTE,
    SAVE_NOTE_STATUS,
    DELETE_NOTE,
    FETCH_RESOURCES,
    SET_PROCESSING,
    SET_NOTIFICATION,
} from '../utils/constants';
import { errorMessages as errorMsg } from '../utils/messages';

export const getNote = state => state.note;

function* saveNote(action) {
    const history = action.payload;
    const note = yield select(getNote);
    let formattedNote = note;

    if (note.tag) {
        formattedNote.tag = formatTag(note.tag);
    }

    try {
        yield call(apiSaveNote, formattedNote);

        yield put({ type: SET_PROCESSING, payload: true });

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

        yield put({ type: SET_PROCESSING, payload: true }); // TEMP
        yield put({ type: FETCH_RESOURCES }); // TEMP
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

function* deleteNote(action) {
    const id = action.payload;

    try {
        yield call(apiDeleteNote, id);

        yield put({ type: SET_PROCESSING, payload: true }); // TEMP
        yield put({ type: FETCH_RESOURCES }); // TEMP
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
    yield takeLatest(SAVE_NOTE, saveNote);
}
export function* watchChangeStatus() {
    yield takeLatest(SAVE_NOTE_STATUS, changeStatus);
}
export function* watchDeleteNote() {
    yield takeLatest(DELETE_NOTE, deleteNote);
}
