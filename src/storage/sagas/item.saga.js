import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../helpers/axios-wrapper';


// {id: 1, title: "teset", completed: false, date: "2018-11-04T22:20:11.441Z"}

export function* fetchItemsSaga() {
    yield put(actions.itemActions.taskFetchStart());
    try {
        const res = yield axios.get('/cake.json');
        const { data } = res; 
        const itemList = Object.keys(data).map((item) => ({ name: item, value: data[item] }));
        yield put(actions.itemActions.taskFetchSuccess(itemList));
    }
    catch (error) {
        yield put(actions.itemActions.taskFetchFail(error));
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
