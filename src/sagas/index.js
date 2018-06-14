import { all } from 'redux-saga/effects';
import { watchLogin, watchRegister, watchLogout } from './auth';
import { watchGetResources } from './resources';

export default function* rootSaga() {
	yield all([watchLogin(), watchRegister(), watchLogout(), watchGetResources()]);
}
