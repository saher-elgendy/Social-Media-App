import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Scream from '../components/Scream';
import { getUserScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

const User = ({ getUserScreams, userScreams, ...props }) => {
    const userHandle = props.match.params.handle;

    useEffect(() => {
        getUserScreams(userHandle)
    }, []);

    console.log('userScreams', userScreams)
    return (
        <>
            {
                userScreams.map(scream => {
                    return <Scream scream={scream} />
                })
            }
        </>
    )
}

User.propTypes = {
    userScreams: PropTypes.array.isRequired,
    getUserScreams: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    userScreams: state.data.userScreams
});

export default connect(mapStateToProps, { getUserScreams })(User);
