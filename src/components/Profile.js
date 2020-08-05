import React from 'react';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs';
import MuiLink from '@material-ui/core/Link';
import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
    ...theme.spread
}));

const Profile = ({ user }) => {
    const {
        authenticated,
        loading,
        credentials: { handle, createdAt, imageUrl, bio, website, location }
    } = user;

    const classes = useStyles();
    console.log(loading)
    const detailedPorfile =
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img className="profile-image" src={imageUrl} alt="profile" />
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <>
                            <LocationOn color="primary"></LocationOn>
                            <span>{location}</span>
                            <hr />
                        </>
                    )}
                    {website && (
                        <>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '} {website}
                            </a>
                            <hr />
                        </>
                    )}
                    <CalendarToday color="primary" />{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>


    const nonAuthenticatedProfile = <Paper className={classes.paper} p={3}>
        <Typography variant="body2" align="center">
            No profile found, Please login
        </Typography>

        <div className={classes.buttons} >
            <Button variant="contained" color="primary" component={Link} to="/login">
                Login
            </Button>
            <Typography component="p" fontWeight="fontWightBold">or</Typography>
            <Button variant="contained" color="secondary" component={Link} to="/signup">
                Signup
            </Button>
        </div>
    </Paper>

    const profile = !loading ? (authenticated ? (detailedPorfile) : (nonAuthenticatedProfile))
        : 'loading profile...';

    return profile;
}

Profile.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Profile)
