import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Scream from '../components/Scream';
import { getUserProfile } from '../redux/actions/dataActions';
import StaticProfile from '../components/StaticProfile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    screamsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    screamList: {
        width: '100%'
    },
    typography: {
        margin: '20px 0 0'
    }
})

const User = ({ getUserProfile, screams, loading, ...props }) => {
    const classes = useStyles();
    const userHandle = props.match.params.handle;
    const screamId = props.match.params.screamId || null;

    useEffect(() => {
        getUserProfile(userHandle)
    }, []);

    return (
        !loading ?
            <Grid container spacing={2}>
                <Grid item xs={12} lg={7}>
                    <div className={classes.screamsContainer}>
                        <Typography color="primary" className={classes.typography}>
                            All {userHandle} Screams
                    </Typography>
                        <Typography color="primary" className={classes.typography}>
                            {screams.length}{' '}{screams.length === 1 ? 'scream' : 'screams'}
                        </Typography>

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
            </Grid> : 'Loading Profile...'
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
        screams: screams ? screams : [],
        loading: state.data.loading
    }
}
export default connect(mapStateToProps, { getUserProfile })(User);