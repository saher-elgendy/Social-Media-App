import { Favorite, FavoriteBorder } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';
import ReusableButton from './ReusableButton';

const LikeButton = ({ user: { authenticated, likes }, likeScream, unlikeScream, screamId }) => {
    const liked = () => {
        if (likes && likes.find(like => like.screamId === screamId)) {
            return true
        } else {
            return false
        }
    }

    const nonAuthenticatedLikeBtn = <ReusableButton title="like" >
        <Link to="/login">
            <FavoriteBorder color="primary" />
        </Link>
    </ReusableButton>

    const likedButton = <ReusableButton title="Undo Like" onClick={() => unlikeScream(screamId)}>
        <Favorite color="primary" />
    </ReusableButton>

    const unlikedButton = <ReusableButton title="Like" onClick={() => likeScream(screamId)}>
        <FavoriteBorder color="primary" />
    </ReusableButton>

    return (
        !authenticated ? nonAuthenticatedLikeBtn :
            (liked() ? likedButton : unlikedButton)
    );
}

LikeButton.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(LikeButton); 
