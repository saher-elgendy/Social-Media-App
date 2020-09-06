import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { markNotificationsRead } from '../redux/actions/userActions';
import { Notifications as NotificationsIcon, Favorite, Chat } from '@material-ui/icons';
import { Badge, Menu, MenuItem, Typography, Tooltip, IconButton } from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';


const Notifications = ({ markNotificationsRead, notifications }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e) => {
        setAnchorEl(null);
    }

    const onMenuOpened = () => {
        const notificationsIds = notifications.filter(n => !n.read).map(n => n.notificationId);
        markNotificationsRead(notificationsIds);
    }

    const unreadNotificationsCount = notifications.filter(n => !n.read).length;
    const notificationsIcon =
        notifications && notifications.length > 0 && unreadNotificationsCount ?
            <Badge badgeContent={unreadNotificationsCount} color="secondary">
                <NotificationsIcon color="default" />
            </Badge> :
            <NotificationsIcon color="default" />

    const notificationsMarkup =
        notifications && notifications.length ?
            notifications.map(n => {
                const verb = n.type === 'like' ? 'liked' : 'commented';
                const iconColor = n.read ? 'primary' : 'secondary';
                const icon = n.type === 'like' ? <Favorite color={iconColor} /> :
                    <Chat color={iconColor} />
                const time = moment(n.createdAt).fromNow();

                return (
                    <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to={`/users/${n.recipient}/scream/${n.screamId}`}
                    >
                        {icon}
                        <Typography
                            variant="body1"
                            style={{
                                marginLeft: '10px'
                            }}
                        >
                            {n.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                )
            }) : <MenuItem>
                You Have No Notififcations
            </MenuItem>
    return (
        <>
            <Tooltip placement="top" title="Notifications">
                <IconButton
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleOpen}
                >
                    {notificationsIcon}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>
        </>
    )
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    markNotificationsRead: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);
