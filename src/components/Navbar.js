import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../redux/actions/userActions';

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

const Navbar = ({ logout }) => {
    const classes = useStyles();

    return (
        <AppBar className={classes.bar}>
            <Toolbar className="nav-container">
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    onClick={logout}
                >Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default connect(null, { logout })(Navbar);
