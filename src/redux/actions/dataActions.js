import axios from 'axios';
import {
    DELETE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA,
    SET_SCREAMS,
    UNLIKE_SCREAM,
    POST_SCREAM,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI
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
