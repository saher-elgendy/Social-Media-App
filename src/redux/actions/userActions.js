import axios from 'axios';
import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS, SET_USER } from './../types';

//login action creator
export const loginUser = (loginData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/signin', loginData)
        .then(res => {
            let FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
            axios.default.headers.common['Authorization'] = FBIdToken;
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response ?  err.response.data : {}
            });
        });
}

//sign up action creator
export const signup = (signupData, history) => (dispatch) => {
    console.log('fired')
    dispatch({ type: LOADING_UI });

    axios.post('/signup', signupData)
        .then(res => {
            let FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
            axios.default.headers.common['Authorization'] = FBIdToken;
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response && err.response.data
            });
        });
}
const getUserData = () => dispatch => {
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}