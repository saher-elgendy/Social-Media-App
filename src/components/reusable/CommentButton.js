import { Chat } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReusableButton from './ReusableButton';

const CommentButton = ({ user: { authenticated } }) => {
    const commentButton = !authenticated ?
        <ReusableButton title="Comment Scream">
            <Link to="/login">
                <Chat color="primary" />
            </Link>
        </ReusableButton> : <ReusableButton title="Comment Scream">
            <Chat color="primary" />
        </ReusableButton>

    return commentButton;
}

CommentButton.propTypes = {
    user: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(CommentButton)
