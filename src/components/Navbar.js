import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/toolbar';
import Link from 'react-router-dom/Link';

const Navbar = () => {
    return (
        <AppBar>
            <Toolbar className="nav-container">
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
