import {
    DELETE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA,
    SET_SCREAMS,
    UNLIKE_SCREAM,
    POST_SCREAM
} from './../types';

const initialState = {
    loading: false,
    screams: [],
    scream: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false,
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return {
                ...state
            }
        case DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index, 1);

            return {
                ...state
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        default:
            return state;
    }
}
