import axios from 'axios';
import {
    CLEAR_ERRORS, DELETE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA,
    LOADING_UI, POST_SCREAM,
    SET_ERRORS, SET_SCREAM, SET_SCREAMS, SET_USER_SCREAMS,
    STOP_LOADING, SUBMIT_COMMENT, UNLIKE_SCREAM
} from './../types';

//Get All Screams
export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA });

    axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        });
}

export const getScream = screamId => dispatch => {
    dispatch({ type: LOADING_UI });

    axios.get(`/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });

            dispatch({ type: STOP_LOADING })
        })
        .catch(err => console.log(err))
}
//post a scream
export const postNewScream = scream => dispatch => {
    dispatch({ type: LOADING_UI });

    axios.post('/screams', scream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}
// like scream
export const likeScream = screamId => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//unlike scream
export const unlikeScream = screamId => dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//submit comment
export const submitComment = (screamId, comment) => dispatch => {
    dispatch({
        type: LOADING_UI
    });

    axios.post(`/scream/${screamId}/comment`, comment)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            })

            dispatch({
                type: STOP_LOADING
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response && err.response.data
            })
        })
}
//delete scream
export const deleteScream = screamId => dispatch => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            })
        })
        .catch(err => console.log(err));
}

//get user screams

export const getUserScreams = userHandle => dispatch => {
    dispatch({
        type: LOADING_DATA
    });

    axios.get(`user/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_USER_SCREAMS,
                payload: res.data.screams
            });
        })
        .catch(() => {
            dispatch({
                type: SET_USER_SCREAMS,
                payload: null
            })
        });
}