import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS, STOP_LOADING } from '../types';

const initialState = {
    loading: false,
    errors: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: {}
            }

        case LOADING_UI:
            return {
                ...state,
                loading: true
            }

        case STOP_LOADING:
            return {
                ...state,
                loading: false
            }
            
        default:
            return state;
    }
}



