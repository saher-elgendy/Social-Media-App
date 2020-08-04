import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            render={props => authenticated ? <Redirect to="/" /> : <Component {...props} />}
            {...rest}
        />
    )
}

export default AuthRoute;