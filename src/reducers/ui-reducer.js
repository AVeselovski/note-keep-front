import {
    VALIDATOR_EMAIL_ERROR,
    VALIDATOR_PASSWORD_ERROR
} from '../utils/types';


const initialState = {
    loggingIn: false,
    emailError: '',
    passwordError: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case VALIDATOR_EMAIL_ERROR:
            return Object.assign({}, state, { emailError: action.payload });;
        case VALIDATOR_PASSWORD_ERROR:
            return { ...state, passwordError: action.payload };
        default:
            return state;
    }
};
