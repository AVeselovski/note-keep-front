import { all } from 'redux-saga/effects';
import { watchLogin, watchRegister, watchLogout } from './auth';
import { watchGetResources } from './resources';
import {
    watchFetchNote,
    watchSaveNote,
    watchChangeStatus,
    watchDeleteNote,
} from './note';

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchRegister(),
        watchLogout(),
        watchGetResources(),
        watchFetchNote(),
        watchSaveNote(),
        watchChangeStatus(),
        watchDeleteNote(),
    ]);
}
