import axios from 'axios';
import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS, SET_USER, SET_UNAUTHENTICATED, LOADING_USER } from './../types';

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


