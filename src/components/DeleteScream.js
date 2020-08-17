import React, { useState } from 'react';
import ReusableButton from './reusable/ReusableButton';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles'
import { DeleteOutline } from '@material-ui/icons';
import { connect } from 'react-redux';
import { deleteScream } from './../redux/actions/dataActions';

const useStyles = makeStyles({
    deleteButton: {
        position: 'absolute',
        left: '90%'
    }
});

const DeleteScream = ({ screamId, ...props }) => {
    const classes = useStyles();

    const [open, toggleOpen] = useState(false);

    const handleOpen = () => {
        toggleOpen(true);
    }

    const handleClose = () => {
        toggleOpen(false);
    }

    const deleteScream = () => {
        props.deleteScream(screamId);
        toggleOpen(false)
    }

    return (
        <>
            <ReusableButton
                title="Delete Scream"
                onClick={handleOpen}
                btnClasses={classes.deleteButton}
            >
                <DeleteOutline color="primary" />
            </ReusableButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this scream ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={deleteScream}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({

})
export default connect(mapStateToProps, { deleteScream })(DeleteScream);