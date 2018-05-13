import { call, put, takeEvery } from 'redux-saga/effects';
import { apiGetCards } from '../api/resources';
import {
    GET_RESOURCES,
    SET_RESOURCES,
    SET_TAGS,
    SET_STATUS_FETCHING_RESOURCES,
    SET_NOTIFICATION
} from '../utils/constants';
import { errorMessages as errorMsg } from '../utils/messages';

const R = require('ramda');

const isActive = R.propEq('status', 'active');
const isNull = (n) => n == null;

const pickActive = (resources) =>  R.filter(isActive, resources);

const pickTags = (resources) => R.pipe(
    R.pluck('tag'),
    R.uniq(),
    R.reject(isNull),
    R.prepend('#all')
)(resources);

function* getResources() {
    try {
        const response = yield call(apiGetCards);

        // make sure to only display tags of active cards
        const active = pickActive(response.data);
        const tags = pickTags(active);

        yield put({ type: SET_RESOURCES, payload: response.data });
        yield put({ type: SET_TAGS, payload: tags });
        yield put({ type: SET_STATUS_FETCHING_RESOURCES, payload: false });

        console.log('Great success!', response.data); // TEMP
    } catch (error) {
        // log error, not temp
        console.log(error);

        yield put({ type: SET_STATUS_FETCHING_RESOURCES, payload: false });

        let customError = errorMsg.genericResponseError;
        // notify error
        yield put({ type: SET_NOTIFICATION, payload: { msg: customError, type: 'error' } });
    }
}

export function* watchGetResources() {
    yield takeEvery(GET_RESOURCES, getResources);
}
