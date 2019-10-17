import {
    RESET_NOTE,
    SET_ADDFORM_TITLE,
    SET_ADDFORM_DESCRIPTION,
    SET_ADDFORM_TAG,
    SET_ADDFORM_PRIORITY,
    SET_VALIDATOR_TITLE_ERROR,
    SET_VALIDATOR_TAG_ERROR,
    SET_NOTE,
} from '../utils/constants';

const initialState = {
    title: '',
    description: '',
    list: {
        ckecklist: true,
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
                title: action.payload.title,
                description: action.payload.description,
                list: action.payload.list,
                tag: action.payload.tag,
                priority: action.payload.priority,
                status: action.payload.status,
                duedate: action.payload.duedate,
                ...action.payload,
            };
        default:
            return state;
    }
};
