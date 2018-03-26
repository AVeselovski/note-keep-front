import {
    TOGGLE_MENU
} from "../utils/constants";


const initialState = {
    menuOpen: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return { ...state, menuOpen: action.payload };
        default:
            return state;
    }
};
