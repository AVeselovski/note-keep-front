import {
    SET_ADDFORM_TITLE,
    SET_ADDFORM_DESCRIPTION,
    SET_ADDFORM_TAG,
    SET_ADDFORM_PRIORITY,
    SET_VALIDATOR_TITLE_ERROR,
    SAVE_NOTE,
    SAVE_NOTE_STATUS,
} from '../utils/constants';

export const setTitle = payload => ({
    type: SET_ADDFORM_TITLE,
    payload,
});

export const setDescription = payload => ({
    type: SET_ADDFORM_DESCRIPTION,
    payload,
});

export const setTag = payload => ({
    type: SET_ADDFORM_TAG,
    payload,
});

export const setPriority = payload => ({
    type: SET_ADDFORM_PRIORITY,
    payload,
});

export const setTitleError = payload => ({
    type: SET_VALIDATOR_TITLE_ERROR,
    payload,
});

export const saveNote = payload => ({
    type: SAVE_NOTE,
    payload,
});

export const changeNoteStatus = payload => ({
    type: SAVE_NOTE_STATUS,
    payload,
});
