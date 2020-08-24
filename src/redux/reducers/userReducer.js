import {
    LIKE_SCREAM,
    LOADING_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER,
    UNLIKE_SCREAM
} from './../types';

const intialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default (state = intialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }

        case SET_UNAUTHENTICATED:
            return {
                ...state,
                authenticated: false
            }

        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload,
            }

        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }

        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            }

        case LOADING_USER:
            return {
                ...state,
                loading: true,
            }

        default:
            return state;
    }
};