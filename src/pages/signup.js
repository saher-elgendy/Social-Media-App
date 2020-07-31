
import { Typography, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import AppIcon from './../images/icon.png';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    form: {
        textAlign: 'center',
    },
    img: {
        maxWidth: 60,
        margin: '1.5rem auto 5px'
    },
    textField: {
        margin: 20
    },
    button: {
        marginTop: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: 120,
        height: 50
    },
    customError: {
        color: 'red',
        fontSize: '0.7rem'
    },
    small: {
        display: 'block',
        marginTop: '1rem'
    },
    circularProgress: {
        color: '#fff',
        position: 'absolute'
    }
});

const Signup = (props) => {
    const classes = useStyles();

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        handle: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post('/signup', signupData)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                setLoading(true);
                props.history.push('/');
            })
            .catch(err => {
                setErrors(err.response.data);
                setLoading(false);
            })
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



export default Signup;
