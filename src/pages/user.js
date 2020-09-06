import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Scream from '../components/Scream';
import { getUserProfile } from '../redux/actions/dataActions';
import StaticProfile from '../components/StaticProfile';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    screamsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    noScreamsContainer: {
        margin: '50px auto'
    },
    screamList: {
        width: '100%'
    },
    typography: {
        margin: '20px 0 0'
    },
    loginMessage: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        marginTop: '20%',
    }
})

const User = ({ getUserProfile, screams, loading, authenticated, ...props }) => {
    const classes = useStyles();
    const userHandle = props.match.params.handle;
    const screamId = props.match.params.screamId || null;

    useEffect(() => {
        getUserProfile(userHandle)
    }, []);
    console.log(loading, authenticated)
    return (
        authenticated ?
            (!loading ?
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={7}>
                        <div className={classes.screamsContainer}>
                            {
                                screams.length ?
                                    <>
                                        <Typography color="primary" className={classes.typography}>
                                            All {userHandle} Screams
                                    </Typography>
                                        <Typography color="primary" className={classes.typography}>
                                            {screams.length}{' '}{screams.length === 1 ? 'scream' : 'screams'}
                                        </Typography>
                                    </> :
                                    <Typography className={classes.noScreamsContainer}>
                                        No screams by this user
                                </Typography>
                            }

                            <ul className={classes.screamList}>
                                {
                                    screams.map(scream => {
                                        return scream.screamId !== screamId ?
                                            <Scream key={scream.screamId} scream={scream} /> :
                                            <Scream key={scream.screamId} scream={scream} openDialog />
                                    })
                                }
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={5}>
                        <StaticProfile />
                    </Grid>
                </Grid> : 'Loading Profile...') : (
                <Typography className={classes.loginMessage}>
                    Please <Link to="/login">login</Link> to see this user profile and activity
                </Typography>)
    )
}

User.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    screams: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    const screams = state.data.userData.screams;
    return {
        screams: screams || [],
        loading: state.data.loading,
        authenticated: state.user.authenticated
    }
}
export default connect(mapStateToProps, { getUserProfile })(User);