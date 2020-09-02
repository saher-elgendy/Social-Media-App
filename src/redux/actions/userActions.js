import axios from 'axios';
import {
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_USER,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    SET_USER,
    MARK_NOTIFICATIONS_READ
} from './../types';

//login action creator
export const loginUser = (loginData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/signin', loginData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response && err.response.data
            });
        });
}

//sign up action creator
export const signup = (signupData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/signup', signupData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response && err.response.data
            });
        });
}

export const logout = () => dispatch => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];

    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => dispatch => {
    dispatch({ type: LOADING_USER });

    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


const setAuthorizationHeader = (token) => {
    let FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}


export const editUserDetails = userDetails => dispatch => {
    dispatch({ type: LOADING_USER });

    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err))
}


//upload image action creator
export const uploadImage = (formData) => dispatch => {
    dispatch({ type: LOADING_USER });

    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData)
        })
        .catch(err => console.log(err))
}

//mark notifications read
export const markNotificationsRead = notificationsIds => dispatch => {
    axios.post('/notifications', notificationsIds)
    .then(() => {
        dispatch({
            type: MARK_NOTIFICATIONS_READ
        })
    })
    .catch(err => console.log(err))
}