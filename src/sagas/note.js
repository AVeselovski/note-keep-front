import { call, put, takeLatest, select } from 'redux-saga/effects';
import { formatTag } from '../utils/helpers';
import {
    apiFetchNote,
    apiPostNote,
    apiPutNote,
    apiPutNoteStatus,
    apiPutNoteItem,
    apiDeleteNote,
} from '../api/note';
import {
    FETCH_NOTE,
    SAVE_NOTE,
    SAVE_NOTE_STATUS,
    DELETE_NOTE,
    FETCH_RESOURCES,
    SET_PROCESSING,
    SET_NOTIFICATION,
    SET_NOTE,
    TOGGLE_CARD_ITEM,
} from '../utils/constants';
import { errorMessages as errorMsg } from '../utils/messages';

export const getNote = state => state.note;

function* fetchNote(action) {
    const id = action.payload;

    yield put({ type: SET_PROCESSING, payload: true });

    try {
        const response = yield call(apiFetchNote, id);

        yield put({ type: SET_PROCESSING, payload: false });
        yield put({ type: SET_NOTE, payload: response.data });
    } catch (error) {
        // log error
        console.log(error);

        yield put({ type: SET_PROCESSING, payload: false });

        // notify error
        let customError = errorMsg.genericResponseError;
        yield put({
            type: SET_NOTIFICATION,
            payload: { msg: customError, type: 'error' },
        });
    }
}

function* saveNote(action) {
    const { history, id } = action.payload;
    const note = yield select(getNote);
    let formattedNote = note;

    if (note.tag) {
        formattedNote.tag = formatTag(note.tag);
    }

    try {
        !id ? yield call(apiPostNote, formattedNote) : yield call(apiPutNote, id, formattedNote);

        yield put({ type: SET_PROCESSING, payload: true });

        // redirect
        note.priority === 0 ? history.push('/dashboard/notes') : history.push('/dashboard/tasks');

        yield put({ type: FETCH_RESOURCES });
    } catch (error) {
        // log error
        console.log(error);

        yield put({ type: SET_PROCESSING, payload: false });

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
        yield call(apiPutNoteStatus, id, status);

        yield put({ type: SET_PROCESSING, payload: true }); // TEMP
        yield put({ type: FETCH_RESOURCES }); // TEMP
    } catch (error) {
        // log error
        console.log(error);

        yield put({ type: SET_PROCESSING, payload: false });

        // notify error
        let customError = errorMsg.genericResponseError;
        yield put({
            type: SET_NOTIFICATION,
            payload: { msg: customError, type: 'error' },
        });
    }
}

function* toggleCardItem(action) {
    const card = action.payload;

    try {
        const response = yield call(apiPutNoteItem, card._id, card.list);

        // log response
        console.log(response.data.message);
    } catch (error) {
        // log error
        console.log(error);

        yield put({ type: SET_PROCESSING, payload: false });

        // notify error
        let customError = errorMsg.genericResponseError;
        yield put({
            type: SET_NOTIFICATION,
            payload: { msg: customError, type: 'error' },
        });
    }
}

function* deleteNote(action) {
    const { id, goBack } = action.payload;

    try {
        const response = yield call(apiDeleteNote, id);

        response && goBack && goBack();

        yield put({ type: SET_PROCESSING, payload: true }); // TEMP
        yield put({ type: FETCH_RESOURCES }); // TEMP
    } catch (error) {
        // log error
        console.log(error);

        yield put({ type: SET_PROCESSING, payload: false });

        // notify error
        let customError = errorMsg.genericResponseError;
        yield put({
            type: SET_NOTIFICATION,
            payload: { msg: customError, type: 'error' },
        });
    }
}

export function* watchFetchNote() {
    yield takeLatest(FETCH_NOTE, fetchNote);
}
export function* watchSaveNote() {
    yield takeLatest(SAVE_NOTE, saveNote);
}
export function* watchChangeStatus() {
    yield takeLatest(SAVE_NOTE_STATUS, changeStatus);
}
export function* watchToggleCardItem() {
    yield takeLatest(TOGGLE_CARD_ITEM, toggleCardItem);
}
export function* watchDeleteNote() {
    yield takeLatest(DELETE_NOTE, deleteNote);
}
