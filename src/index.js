import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './utils/store';
import App from './App';
import { SET_IS_AUTHORIZED } from './utils/constants';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const token = localStorage.getItem('token');
if (token) {
	store.dispatch({ type: SET_IS_AUTHORIZED, payload: true });
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App token={token} />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
