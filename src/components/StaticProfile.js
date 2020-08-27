import React from 'react'
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as MuiLink, Typography } from '@material-ui/core';
import { Link as LinkIcon, LocationOn, CalendarToday } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';


const useStyles = makeStyles(theme => ({
    ...theme.spread
}));

const StaticProfile = ({ userDetails }) => {
    const classes = useStyles();
    const { handle, location, bio, website, imageUrl, createdAt } = userDetails;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                </div>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h6">
                        @{handle}
                    </MuiLink>
                    {bio && <Typography variant="body1">{bio}</Typography>}
                    <hr />
                    {
                        location &&
                        <>
                            <LocationOn color="primary" />
                            <span color="primary">{location}</span>
                            <hr />
                        </>
                    }
                    {
                        website &&
                        <>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {website}
                            </a>
                            <hr />
                        </>
                    }
                    {
                        <>
                            <CalendarToday color="primary" />{' '}
                            <span variant="body1">
                                Joined {moment(createdAt).format('MMM, YYYY')}
                            </span>
                        </>
                    }
                </div>
            </div>
        </Paper >
    )
}

StaticProfile.propTypes = {
    userDetails: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    const userDetails = state.data.userData.user;
    return {
        userDetails: userDetails ? userDetails : {}
    }
}

export default connect(mapStateToProps)(StaticProfile)