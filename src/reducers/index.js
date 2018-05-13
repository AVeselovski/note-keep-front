import { combineReducers } from 'redux';
import auth from './auth';
import ui from './ui';
import resources from './resources';


const AppReducer = combineReducers({
    auth,
    ui,
    resources
});

export default AppReducer;
