import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditUserDetails from './EditUserDetails';

import { Button, IconButton, Paper, Tooltip, Typography, Link as MuiLink } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CalendarToday, Edit, LocationOn, Link as LinkIcon } from '@material-ui/icons';
import dayjs from 'dayjs';
import { uploadImage } from './../redux/actions/userActions';



const useStyles = makeStyles(theme => ({
    ...theme.spread
}));

const Profile = ({ user, uploadImage }) => {
    const {
        authenticated,
        loading,
        credentials: { handle, createdAt, imageUrl, bio, website, location }
    } = user;

    const classes = useStyles();

    //creating image input ref
    const imageInput = useRef();

    const handleImageChange = (e) => {
        const image = e.target.files[0];

        const formData = new FormData();
        formData.append('image', image, image.name);
        uploadImage()
    }

    const handleEditPicture = () => {
        imageInput.current.click();
    }


    const detailedPorfile =
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img className="profile-image" src={imageUrl} alt="profile" />
                    <input
                        type="file"
                        ref={imageInput}
                        onChange={handleImageChange}
                        hidden="hidden"
                    />
                    <Tooltip title="Edit Profile Picture" placement="top">
                        <IconButton onClick={handleEditPicture} className="button">
                            <Edit color="primary" />
                        </IconButton>
                    </Tooltip>
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
                <EditUserDetails />
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
    user: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { uploadImage })(Profile)
