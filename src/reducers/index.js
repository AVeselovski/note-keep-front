import { combineReducers } from 'redux';
import data from './data-reducer';
import ui from './ui-reducer';

const AppReducer = combineReducers({
  data,
  ui
});

export default AppReducer;
