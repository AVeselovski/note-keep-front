import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppReducer from '../reducers';
import rootSaga from '../sagas/root-saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]

const store = createStore(AppReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
