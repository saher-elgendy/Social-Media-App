import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteScream from './DeleteScream';
import CommentButton from './reusable/CommentButton';
import LikeButton from './reusable/LikeButton';
import ScreamDetails from './ScreamDetails';

const useStyles = makeStyles({
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    image: {
        minWidth: 200,
    }
});

const Scream = ({ user: { credentials, authenticated }, scream, openDialog }) => {
    const {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
    } = scream;

    const classes = useStyles();

    const deleteButton = authenticated && (userHandle === credentials.handle) ?
        <DeleteScream screamId={screamId} /> : null

    return (
        <Card className={classes.card}>
            <CardMedia
                image={userImage}
                title="profile image"
                className={classes.image}
            />
            <CardContent className={classes.content}>
                <Typography
                    variant="h5"
                    color="primary"
                    component={Link}
                    to={`/users/${userHandle}`}
                >{userHandle}</Typography>
                {deleteButton}

                <Typography
                    variant="body2"
                    color="textSecondary">
                    {moment.utc(createdAt).calendar()}
                </Typography>

                <Typography variant="body1">{body}</Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} likes</span>
                <CommentButton />
                <span>{commentCount} comments</span>
            </CardContent>

            <ScreamDetails screamId={screamId} handle={userHandle} openDialog={openDialog} />
        </Card>
    )
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Scream);