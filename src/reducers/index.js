import { combineReducers } from 'redux';
import auth from './auth-reducer';
import data from './data-reducer';
import ui from './ui-reducer';


const AppReducer = combineReducers({
    auth,
    data,
    ui
});


export default AppReducer;
