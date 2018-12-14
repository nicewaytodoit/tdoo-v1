import * as actionTypes from '../actions/action-types/item.action-type';

// In TypeScript this could be interface emposing types 
const initialItemState = {
    tasks: [],
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
