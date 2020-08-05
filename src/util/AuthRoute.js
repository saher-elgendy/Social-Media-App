import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
    console.log(authenticated)
    return (
        <Route
            render={props => authenticated ? <Redirect to="/" /> : <Component {...props} />}
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