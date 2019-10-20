import { remove } from 'ramda';
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
} from '../utils/constants';

const initList = {
    checklist: false,
    items: [],
};

const initialState = {
    title: '',
    description: '',
    list: {
        checklist: false,
        items: [],
    },
    tag: '',
    priority: 0,
    status: 'active',
    duedate: null,
    validatorErrors: {
        titleError: '',
        tagError: '',
    },
};

const listReducer = (state = initialState.list, action) => {
    switch (action.type) {
        case SET_NOTE:
            return {
                ...state,
                ...action.payload.list,
            };
        case SET_LIST_ITEM:
            return {
                ...state,
                items: state.items.map((item, i) =>
                    i === action.payload.index
                        ? { ...item, name: action.payload.value }
                        : item
                ),
            };
        case REMOVE_LIST_ITEM:
            return {
                ...state,
                items: remove(action.payload, 1, state.items),
            };
        case ADD_LIST_ITEM:
            return {
                ...state,
                items: [...state.items, { checked: false, name: '' }],
            };
        default:
            return state;
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_NOTE:
            return initialState;
        case SET_ADDFORM_TITLE:
            return { ...state, title: action.payload };
        case SET_ADDFORM_DESCRIPTION:
            return { ...state, description: action.payload };
        case SET_ADDFORM_TAG:
            return { ...state, tag: action.payload };
        case SET_ADDFORM_PRIORITY:
            return { ...state, priority: action.payload };
        case SET_VALIDATOR_TITLE_ERROR:
            return {
                ...state,
                validatorErrors: {
                    ...state.validatorErrors,
                    titleError: action.payload,
                },
            };
        case SET_VALIDATOR_TAG_ERROR:
            return {
                ...state,
                validatorErrors: {
                    ...state.validatorErrors,
                    tagError: action.payload,
                },
            };
        case SET_NOTE:
            return {
                ...state,
                ...action.payload,
                title: action.payload.title,
                description: action.payload.description,
                list: action.payload.list
                    ? listReducer(state.list, action)
                    : initList,
                tag: action.payload.tag,
                priority: action.payload.priority,
                status: action.payload.status,
                duedate: action.payload.duedate,
            };
        case SET_LIST_ITEM:
            return { ...state, list: listReducer(state.list, action) };
        case REMOVE_LIST_ITEM:
            return { ...state, list: listReducer(state.list, action) };
        case ADD_LIST_ITEM:
            return { ...state, list: listReducer(state.list, action) };
        default:
            return state;
    }
};
