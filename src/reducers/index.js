import { combineReducers } from 'redux';
import auth from './auth';


const AppReducer = combineReducers({
    auth
});


export default AppReducer;
