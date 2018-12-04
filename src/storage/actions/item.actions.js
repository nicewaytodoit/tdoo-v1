import * as actionTypes from './action-types/action-types';

export const taskFetchStart = () => {
    return {
        type: actionTypes.TASK_FETCH_START,
        loading: true,
    }
}

export const taskFetchSuccess = (tasks) => {
    return {
        type: actionTypes.TASK_FETCH_SUCCESS,
        tasks: [...tasks], // Update names
        loading: false,
    }
}

export const taskFetchFail = (error) => {
    return {
        type: actionTypes.TASK_FETCH_FAIL,
        error: error,
        loading: false,
    }
}

export const taskFetch = () => {
    return {
        type: actionTypes.TASK_FETCH
    }
}
