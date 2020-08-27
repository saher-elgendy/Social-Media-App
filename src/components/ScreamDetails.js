import {
    CircularProgress, Dialog,
    DialogContent,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close, UnfoldMore } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getScream } from '../redux/actions/dataActions';
import Comments from './Comments';
import CommentButton from './reusable/CommentButton';
import LikeButton from './reusable/LikeButton';
import ReusableButton from './reusable/ReusableButton';


const useStyles = makeStyles(theme => ({
    ...theme.spread,
    expand: {
        position: 'absolute',
        left: '90%',
        top: '70%',
        height: '50px'
    },
    dialog: {
        padding: '1rem',
        textAlign: 'center'
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem'
    },
    close: {
        marginLeft: 'auto',
        marginRight: '1rem',
        borderRadius: '50%'
    },
    imgGrid: {
        textAlign: 'center'
    },
    contentGrid: {
        textAlign: 'left'
    },
    progressContainer: {
        width: '100%',
        height: '100%',
        textAlign: 'center'
    },
    img: {
        width: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    likes: {
        fontSize: 'medium',
        marginLeft: '0.5rem'
    },
    invisibleSeperator: {
        visibility: 'hidden'
    }
}));

const ScreamDetails = ({ getScream, scream, screamId, loading, openDialog, handle }) => {
    const {
        body,
        userImage,
        createdAt,
        likeCount,
        comments,
        commentCount } = scream;

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [paths, setPaths] = useState({
        oldPath: '',
        newPath: ''
    });

    const handleOpen = () => {
        const oldPath = window.location.pathname;
        const newPath = `/users/${handle}/scream/${screamId}`;

        if(paths.oldPath === newPath){
            setPaths({
                ...paths,
                oldPath: `/users/${handle}`
            });
        } 

        else {
            setPaths({
                oldPath,
                newPath
            });
        }
        //change path to the new one
        window.history.pushState(null, null, newPath);
        //open scream dialog
        setOpen(true);
        getScream(screamId);
    }

    const handleClose = () => {
        window.history.pushState(null, null, paths.oldPath)
        setOpen(false);
    }

    useEffect(() => {
        if (openDialog) handleOpen();
    }, []);

    const DialogMarkup = loading ?
        (
            <div className={classes.progressContainer}>
                <CircularProgress
                    size={100}
                    thickness={2}
                    color="primary"
                />
            </div>
        ) :
        (<Grid container spacing={2}>
            <Grid item sm={5} className={classes.imgGrid}>
                <img src={userImage} alt="profile" className={classes.img} />
            </Grid>
            <Grid item sm={7} className={classes.contentGrid}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${handle}`}
                >
                    @{handle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {moment.utc(createdAt).calendar()}
                </Typography>
                <hr className={classes.invisibleSeperator} />
                <Typography variant="body1">{body}</Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} likes</span>
                <CommentButton />
                <span>{commentCount} comments</span>
            </Grid>
        </Grid>)

    return (
        <>
            <ReusableButton
                title="Expand Scream"
                onClick={handleOpen}
                tipClasses={classes.expand}
            >
                <UnfoldMore color="primary" />
            </ReusableButton>
            <Dialog
                className={classes.dialog}
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <ReusableButton
                    tipClasses={classes.close}
                    title="close"
                    onClick={handleClose}
                >
                    <Close />
                </ReusableButton>
                <DialogContent className={classes.dialogContent}>
                    {DialogMarkup}
                    <Comments screamId={screamId} comments={comments} />
                </DialogContent>
            </Dialog>
        </>
    )
}

ScreamDetails.propTypes = {
    getScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    loaading: PropTypes.bool.isRequired,
    handle: PropTypes.string.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    loading: state.UI.loading,
    scream: state.data.scream
});

export default connect(mapStateToProps, { getScream })(ScreamDetails);
