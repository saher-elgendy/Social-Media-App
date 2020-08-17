import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import ReusableButton from './reusable/ReusableButton';


const useStyles = makeStyles(theme => ({
    ...theme.spread,
    tooltip: {
        display: 'block',
        margin: 'auto'
    }
}));

const EditUserDetails = ({ editUserDetails }) => {
    const classes = useStyles();

    const [userDetails, setUserDetails] = useState({
        bio: '',
        location: '',
        website: ''
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editUserDetails(userDetails);
    }

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    };


    return (
        <>
            <ReusableButton
                title="Edit Details"
                tipClasses={classes.tooltip}
                onClick={handleOpen}
            >
                <Edit color="primary" />
            </ReusableButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidt
                maxWidth="sm"
            >
                <DialogTitle>Edit Your details</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            row="3"
                            placeholder="A short bio about your self"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="A short bio about your self"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="A short bio about your self"
                            onChange={handleChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="secondary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

EditUserDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(EditUserDetails);


