import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { submitComment } from '../redux/actions/dataActions';
import { makeStyles} from '@material-ui/core/styles';

const useStyles= makeStyles(theme => ({
    commentBtn: {
        margin: '10px 0 20px'
    }
}))

const CommentFom = ({ screamId, errors, submitComment }) => {
    const classes = useStyles();
    const [comment, setComment] = useState({
        body: ''
    });

    const handleChange = (e) => {
        setComment({
            body: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        submitComment(screamId, comment)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type="text"
                name="comment"
                label="Comment Scream"
                onChange={handleChange}
                error={errors && errors.comment ? true : false}
                helperText={errors.comment}
                fullWidth
                multiline
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.commentBtn}
            >
                Comment
            </Button>
        </form>
    )
}

const mapStateToProps = state => ({
    errors: state.UI.errors
})
export default connect(mapStateToProps, { submitComment })(CommentFom);
