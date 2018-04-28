import { combineReducers } from 'redux';
import auth from './auth';
import ui from './ui';


const AppReducer = combineReducers({
    auth,
    ui
});

export default AppReducer;
