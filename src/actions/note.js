import {
    RESET_NOTE,
    SET_ADDFORM_TITLE,
    SET_ADDFORM_DESCRIPTION,
    SET_ADDFORM_TAG,
    SET_ADDFORM_PRIORITY,
    SET_VALIDATOR_TITLE_ERROR,
    SET_VALIDATOR_TAG_ERROR,
    SET_NOTE,
    SET_LIST_ITEM,
    REMOVE_LIST_ITEM,
    ADD_LIST_ITEM,
    FETCH_NOTE,
    SAVE_NOTE,
    SAVE_NOTE_STATUS,
    DELETE_NOTE,
} from '../utils/constants';

export const reset = payload => ({
    type: RESET_NOTE,
    payload,
});

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

export const setTagError = payload => ({
    type: SET_VALIDATOR_TAG_ERROR,
    payload,
});

export const setNote = payload => ({
    type: SET_NOTE,
    payload,
});

export const setListItem = payload => ({
    type: SET_LIST_ITEM,
    payload,
});

export const removeListItem = payload => ({
    type: REMOVE_LIST_ITEM,
    payload,
});

export const addListItem = () => ({
    type: ADD_LIST_ITEM,
});

export const fetchNote = payload => ({
    type: FETCH_NOTE,
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

export const deleteNote = payload => ({
    type: DELETE_NOTE,
    payload,
});
