import {
    Button,
    CircularProgress, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { postNewScream } from '../redux/actions/dataActions';
import ReusableButton from './reusable/ReusableButton';
import store from '../redux/store';
import { CLEAR_ERRORS } from '../redux/types';


const useStyles = makeStyles(theme => ({
    ...theme.spread,
    postScreamBtn: {
        color: 'inherit'
    },

    dialogBtns: {
        margin: '20px'
    }
}));

const PostScream = ({ postNewScream, UI: { loading, errors } }) => {
    const classes = useStyles();

    const [scream, setScream] = useState({ body: '' });
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
        //restoring the empty scream body
        setScream({ body: '' });
        //dialog shouldn't remember the previous error after close and reopen
        store.dispatch({ type: CLEAR_ERRORS });
    }

    const handleChange = (e) => {
        setScream({ body: e.target.value });
    }

    const handleSubmit = (e) => {
        postNewScream(scream);
    }
    //closing the dialog after successful posting
    useEffect(() => {
        if (scream.body && !loading) {
            handleClose()
        }
    }, [loading]);

    return (
        <>
            <ReusableButton
                title="Post a Scream"
                tipClasses={classes.postScreamBtn}
                onClick={handleOpen}
            >
                <Add />
            </ReusableButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Post a Scream
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="scream"
                            type="text"
                            id="scream"
                            label="Scream"
                            placeholder="Enter Your Scream"
                            onChange={handleChange}
                            fullWidth
                            multiline
                            error={errors && errors.body ? true : false}
                            helperText={errors && errors.body ? errors.body : ''}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        variant="contained"
                        className={`${classes.button} ${classes.dialogBtns}`}
                        onClick={handleClose}
                    >Cancel</Button>
                    <Button
                        color="primary"
                        variant="contained"
                        className={`${classes.button} ${classes.dialogBtns}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress className={classes.circularProgress} /> : 'Post'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postNewScream })(PostScream);