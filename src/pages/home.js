import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import Scream from '../components/Scream';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';


const Home = ({ getScreams, data: {screams, loading} }) => {
    useEffect(() => {
        getScreams();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item lg={8} xs={12}>
                {
                    !loading ? 
                        screams.map(scream => {
                            return (
                                <Scream key={scream.screamId} scream={scream} />
                            )
                        }) : 'Loading...'
                }
            </Grid>
            <Grid item lg={4} xs={12} >
                <Profile />
            </Grid>
        </Grid>
    )
}

Home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getScreams })(Home);
