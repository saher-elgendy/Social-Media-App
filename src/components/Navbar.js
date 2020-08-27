
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Home, Notifications } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './../redux/actions/userActions';
import ReusableButton from './reusable/ReusableButton';
import PostScream from './PostScream';


const useStyles = makeStyles(theme => ({
    ...theme.spread,
    icon: {
        color: '#fff'
    },

    bar: {
        flexDirection: 'row',
        padding: 5,
        color: '#fff'
    },
    img: {
        width: 80
    }
}));

const Navbar = ({ authenticated, logout }) => {
    const classes = useStyles();

    return (
        <AppBar className={classes.bar}>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <>
                        <PostScream />
                        <ReusableButton title="Home">
                            <Link to="/">
                                <Home className={classes.icon} />
                            </Link>
                        </ReusableButton>
                        <ReusableButton title="Notifications">
                            <Notifications className={classes.icon} />
                        </ReusableButton>
                        <Button
                            component={Link}
                            to="/login"
                            onClick={logout}
                            className={classes.icon}
                        >Logout</Button>
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
