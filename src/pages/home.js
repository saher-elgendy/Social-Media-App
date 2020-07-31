import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Scream from '../components/Scream';

const Home = () => {
    const [screams, setScreams] = useState(null);

    useEffect(() => {
        axios.get('/screams')
            .then(res => {
                setScreams(res.data.screams);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {
                    screams ?
                        screams.map(scream => {
                            return (
                                <Scream key={scream.screamId} scream={scream}/>
                            )
                        }) : 'Loading...'
                }
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>...profile</p>
            </Grid>
        </Grid>
    )
}

export default Home
