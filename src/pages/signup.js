
import { CircularProgress, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../redux/actions/userActions';
import AppIcon from './../images/icon.png';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    ...theme.spread
}));


const Signup = ({signup , history, UI: {loading, errors} }) => {
    const classes = useStyles();

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        handle: ''
    });

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(signupData, history);
    }

    const { general, email, password, confirmPassword, handle } = errors;

    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <img src={AppIcon} alt="thunder" className={classes.img} />
                <Typography variant="h5" className={classes.pageTitle}>Signup</Typography>
                <form noValidate onSubmit={handleSubmit} >
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        className={classes.textField}
                        onChange={handleChange}
                        helperText={email}
                        error={email ? true : false}
                        fullWidth
                    />

                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        label="Password"
                        className={classes.textField}
                        onChange={handleChange}
                        helperText={password}
                        error={password ? true : false}
                        fullWidth
                    />

                    <TextField
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        className={classes.textField}
                        onChange={handleChange}
                        helperText={confirmPassword}
                        error={confirmPassword ? true : false}
                        fullWidth
                    />
                    <TextField
                        id="handle"
                        type="text"
                        name="handle"
                        label="Handle"
                        className={classes.textField}
                        onChange={handleChange}
                        helperText={handle}
                        error={handle ? true : false}
                        fullWidth
                    />
                    {
                        general &&
                        <Typography
                            variant="body2"
                            className={classes.customError}
                        >
                            {general}
                        </Typography>
                    }
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress className={classes.circularProgress} /> : 'Signup'}
                    </Button>
                    <small className={classes.small}>
                        Already have an account? login <Link to="/login">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}

Signup.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI,
})


export default connect(mapStateToProps, { signup })(Signup);
