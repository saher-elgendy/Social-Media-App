import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';


const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    data: dataReducer,
    user: userReducer,
    UI: uiReducer
});

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;