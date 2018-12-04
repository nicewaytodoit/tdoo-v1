import * as actionTypes from '../actions/action-types/action-types';

// In TypeScript this could be interface emposing types 
const initialItemState = {
    tasks: [
        {
            id: 1,
            name: "Buy groceries",
            date: Date.now(),
            done: false,
        },
        {
            id: 2,
            name: "Single Rows with [done]",
            date: Date.now(),
            done: false,
        },
        {
            id: 3,
            name: "Cross and make it better",
            date: Date.now(),
            done: false,
        },
    ],
    error: null
}

const itemReducer = (state = initialItemState, action) => {
    switch (action.type) {
        case actionTypes.TASK_FETCH_START:
            return state;
        case actionTypes.TASK_FETCH_FAIL:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.TASK_FETCH_SUCCESS:
            return {
                ...state,
                tasks: [...action.tasks]
            };
        default:
            return state;
    }
}

export default itemReducer;
