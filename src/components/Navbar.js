
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import { logout } from './../redux/actions/userActions';
import ReusableButton from './reusable/ReusableButton';


const useStyles = makeStyles({
    bar: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
    },
    img: {
        width: 80
    }
})

const Navbar = ({ authenticated, logout }) => {
    console.log('authenticated', authenticated)
    const classes = useStyles();
    return (
        <AppBar className={classes.bar}>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/login"
                            onClick={logout}
                        >Logout</Button>

                        <ReusableButton title="Post a scream">
                            <Add color="primary" />
                        </ReusableButton>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </>
                ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                           
                        </>
                    )
                }

            </Toolbar>
        </AppBar>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
