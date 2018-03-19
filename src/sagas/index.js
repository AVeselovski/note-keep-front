import { all } from 'redux-saga/effects';
import { watchLogin, watchLogout } from "./auth";


export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchLogout()
    ]);
}
