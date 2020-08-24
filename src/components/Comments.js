import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentFom from './CommentFom';

const useStyles = makeStyles(theme => ({
    ...theme.spread,
    img: {
        width: '70px',
        borderRadius: '50%'
    },
    commentBody: {
        textAlign: 'left',
        fontSize: 'medium'
    },
}));

const Comments = ({ comments, screamId, loading }) => {
    const classes = useStyles();

    return (
        !loading && 
        <>
            <CommentFom screamId={screamId} />
            <ul className={classes.commentList}>
                {
                    comments && comments.map((comment, index) => {
                        const { body, createdAt, userImage, userHandle } = comment
                        return (
                            <>
                                <Grid container>
                                    <Grid item sm={2} spacing={2}>
                                        <img src={userImage} alt="comment" className={classes.img} />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentBody}>
                                            <Typography
                                                variant="h6"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                            >
                                                @{userHandle}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="textSecondary"
                                            >
                                                {moment.utc(createdAt).calendar()}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                            >
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                {
                                    index !== comments.length - 1 &&
                                    <hr className={classes.visibleSeperator} />
                                }
                            </>
                        )
                    })
                }
            </ul>
        </>

    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    loading: state.UI.loading
})

export default connect(mapStateToProps)(Comments);
