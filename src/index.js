import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './reducers';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(AppReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
