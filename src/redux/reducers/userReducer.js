import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER, LOADING_USER } from './../types';

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
            case LOADING_USER:
                return {
                    ...state,
                    loading: true,
                }

        default:
            return state;
    }
};