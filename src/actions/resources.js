import {
    FETCH_RESOURCES,
    SET_ACTIVE_TAG,
    SET_TASKS,
    SET_NOTES,
    SET_ARCHIVE,
    UPDATE_RESOURCES,
} from '../utils/constants';

export const fetchCards = () => ({
    type: FETCH_RESOURCES,
});

export const setActiveTag = payload => ({
    type: SET_ACTIVE_TAG,
    payload,
});

export const setTasks = payload => ({
    type: SET_TASKS,
    payload,
});

export const setNotes = payload => ({
    type: SET_NOTES,
    payload,
});

export const setArchive = payload => ({
    type: SET_ARCHIVE,
    payload,
});

export const updateResources = payload => ({
    type: UPDATE_RESOURCES,
    payload,
});
