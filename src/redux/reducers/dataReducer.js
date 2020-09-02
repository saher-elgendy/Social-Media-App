import {
    DELETE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA,
    POST_SCREAM, SET_SCREAM, SET_SCREAMS,
    SUBMIT_COMMENT, UNLIKE_SCREAM, SET_USER_DATA
} from './../types';


const initialState = {
    loading: false,
    screams: [],
    scream: {},
    userData: {},
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

        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload,
                loading: false
            }

        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            const allScreams = state.screams.map(scream => {
                if (scream.screamId === action.payload.screamId) {
                    return {
                        ...scream,
                        likeCount: action.payload.likeCount
                    }
                }
                return scream;
            });

            const userScreams = state.userData.screams.map(scream => {
                if (scream.screamId === action.payload.screamId) {
                    return {
                        ...scream, 
                        likeCount: action.payload.likeCount
                    }
                }
                return scream;
            })

            return {
                ...state,
                screams: allScreams,
                scream: {
                    ...state.scream,
                    likeCount: action.payload.likeCount
                },
                userData: {
                    ...state.userData,
                    screams: userScreams
                }
            }

        case DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== action.payload)
            }

        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }

        case SUBMIT_COMMENT:
            const screams = state.screams.map(scream => {
                if (scream.screamId === action.payload.screamId) {
                    return {
                        ...scream,
                        commentCount: scream.commentCount + 1
                    }
                }
                return scream;
            })

            const allUserScreams = state.userData.screams.map(scream => {
                if (scream.screamId === action.payload.screamId) {
                    return {
                        ...scream,
                        commentCount: scream.commentCount + 1
                    }
                }
                return scream;
            })


            return {
                ...state,
                screams,
                scream: {
                    ...state.scream,
                    commentCount: state.scream.commentCount + 1,
                    comments: [action.payload, ...state.scream.comments]
                },
                userData: {
                    ...state.userData,
                    screams: allUserScreams
                }
            }

        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
                loading: false
            }

        default:
            return state;
    }
}
