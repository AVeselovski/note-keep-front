import {
    FETCH_RESOURCES,
    SET_ACTIVE_TAG,
    SET_TASKS,
    SET_NOTES,
    SET_ARCHIVE,
} from '../utils/constants';

export const fetchCards = () => ({
    type: FETCH_RESOURCES,
});

export const setActiveTag = val => ({
    type: SET_ACTIVE_TAG,
    payload: val,
});

export const setTasks = tasks => ({
    type: SET_TASKS,
    payload: tasks,
});

export const setNotes = notes => ({
    type: SET_NOTES,
    payload: notes,
});

export const setArchive = archived => ({
    type: SET_ARCHIVE,
    payload: archived,
});
