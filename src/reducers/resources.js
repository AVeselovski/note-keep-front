import {
    SET_RESOURCES,
    SET_TAGS,
    SET_ACTIVE_TAG,
    RESET_DATA
} from '../utils/constants';


const initialState = {
    allCards: [],
    tags: [],
    activeTag: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RESOURCES:
            return { ...state, allCards: action.payload };
        case SET_TAGS:
            return { ...state, tags: action.payload };
        case SET_ACTIVE_TAG:
            return { ...state, activeTag: action.payload };
        case RESET_DATA:
            return { ...initialState };
        default:
            return state;
    }
};
