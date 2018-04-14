import { all } from 'redux-saga/effects';
import { watchLogin, watchRegister, watchLogout } from "./auth";


export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchRegister(),
        watchLogout()
    ]);
}
