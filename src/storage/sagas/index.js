import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/action-types';
import { fetchItemsSaga } from './item.saga';

export function* watchItems() {
    yield all([
            takeEvery(actionTypes.itemActionTypes.TASK_FETCH, fetchItemsSaga),
            // takeEvery(actionTypes.TASK_FETCH, fetchItemsSaga),
        ]);
}
