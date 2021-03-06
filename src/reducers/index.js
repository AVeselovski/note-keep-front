import { combineReducers } from 'redux';
import auth from './auth';
import ui from './ui';
import resources from './resources';
import note from './note';

const AppReducer = combineReducers({
	auth,
	ui,
	resources,
	note
});

export default AppReducer;
