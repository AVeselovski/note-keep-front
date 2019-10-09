import {
    SET_RESOURCES,
    SET_TAGS,
    SET_ACTIVE_TAG,
    RESET_DATA,
    SET_TASKS,
    SET_NOTES,
    SET_ARCHIVE,
} from '../utils/constants';

const initialState = {
    allCards: [],
    tags: [],
    activeTag: '',
    tasks: [],
    notes: [],
    archive: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RESOURCES:
            return { ...state, allCards: action.payload };
        case SET_TAGS:
            return { ...state, tags: action.payload };
        case SET_ACTIVE_TAG:
            return { ...state, activeTag: action.payload };
        case SET_TASKS:
            return { ...state, tasks: action.payload };
        case SET_NOTES:
            return { ...state, notes: action.payload };
        case SET_ARCHIVE:
            return { ...state, archive: action.payload };
        case RESET_DATA:
            return { ...initialState };
        default:
            return state;
    }
};
