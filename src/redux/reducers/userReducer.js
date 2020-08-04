import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from './../types';

const intiialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default (state = intiialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }

        case SET_UNAUTHENTICATED:
            return {
                ...state,
                authmeticated: false
            }

        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            }

        default:
            return state;
    }
};