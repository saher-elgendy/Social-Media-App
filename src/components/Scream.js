import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Chat, Favorite, FavoriteBorder } from '@material-ui/icons';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeScream, unlikeScream } from './../redux/actions/dataActions';
import DeleteScream from './DeleteScream';
import ReusableButton from './reusable/ReusableButton';

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
})

const Scream = ( { user: { credentials, likes, authenticated }, scream, ...props }) => {
    const {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount } = scream;

    const classes = useStyles();

    dayjs.extend(calendar);

    const liked = () => {
        if (likes && likes.find(like => like.screamId === scream.screamId)) {
            return true
        } else {
            return false;
        }
    }

    const likeScream = () => {
        props.likeScream(screamId);
    }

    const unlikeScream = () => {
        props.unlikeScream(screamId);
    }

    const likeButton = !authenticated ?
        (<ReusableButton title="Like">
            <Link to="/login">
                <FavoriteBorder color="primary" />
            </Link>
        </ReusableButton>) :
        (
            liked() ? (
                <ReusableButton title="Undo Like" onClick={unlikeScream}>
                    <Favorite color="primary" />
                </ReusableButton>
            ) : (
                    <ReusableButton title="Like" onClick={likeScream}>
                        <FavoriteBorder color="primary" />
                    </ReusableButton>
                )
        )

    const commentButton = !authenticated ? (
        <ReusableButton title="Comment Scream">
            <Link to="/login">
                <Chat color="primary" />
            </Link>
        </ReusableButton>
    ) : (
            <ReusableButton title="Comment scream">
                <Chat color="primary" />
            </ReusableButton>
        )


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
                    to={`/user/${userHandle}`}
                >{userHandle}</Typography>
                {deleteButton}

                <Typography
                    variant="body2"
                    color="textSecondary">
                    {dayjs().calendar(dayjs(createdAt))}
                </Typography>

                <Typography variant="body1">{body}</Typography>
                {likeButton}
                <span>{likeCount}</span>
                <span> likes</span>
                {commentButton}
                {commentCount}
                <span> comments</span>
            </CardContent>
        </Card>
    )
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { likeScream, unlikeScream })(Scream);