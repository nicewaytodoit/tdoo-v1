import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchItemsSaga } from './item.saga';

export function* watchItems() {
    yield all([
            takeEvery(actionTypes.TASK_FETCH, fetchItemsSaga),
            // takeEvery(actionTypes.TASK_FETCH, fetchItemsSaga),
        ]);
}
