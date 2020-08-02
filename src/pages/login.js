
import { Typography, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import AppIcon from './../images/icon.png';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
   ...theme.spread
}));

const Login = (props) => {
    const classes = useStyles();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post('/signin', loginData)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                setLoading(true);
                props.history.push('/');
            })
            .catch(err => {
                console.log('eror is', err.response.data)
                setErrors(err.response.data);
                setLoading(false);
            })
    }

    const { general, email, password } = errors;
    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <img src={AppIcon} alt="thunder" className={classes.img} />
                <Typography variant="h5" className={classes.pageTitle}>Login</Typography>
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
                        {loading ? <CircularProgress className={classes.circularProgress} /> : 'Login'}
                    </Button>
                    <small className={classes.small}>
                        don't have an account? sign up <Link to="/signup">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}



export default Login;
