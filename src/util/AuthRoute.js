import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';


const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            component={props => authenticated ? <Redirect to="/" /> : <Component {...props} />}
            {...rest}
        />
    )
}

AuthRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});
export default connect(mapStateToProps)(AuthRoute);