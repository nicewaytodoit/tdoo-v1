import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../helpers/axios-wrapper';



export function* fetchItemsSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const res = yield axios.get('/items.json' + queryParams);
        const itemsData = [];
        for (let key in res.data) {
            itemsData.push({
                ...res.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(itemsData));
    }
    catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}

// export function* saveItemsSaga(action) {
//     yield put(actions.saveItemStart());
//     try {
//         const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
//         yield put(actions.saveItemSuccess(response.data.name, action.orderData));
//     }
//     catch (error) {
//         put(actions.saveItemFail(error));
//     }
// }
