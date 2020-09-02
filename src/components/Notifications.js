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
        setAnchorEl(e.target)
    }

    const handleClose = (e) => {
        setAnchorEl(null);
    }

    const onMenuOpened = () => {
        const notificationsIds = notifications.filter(n => !n.read).map(n => n.notificationId);
        markNotificationsRead(notificationsIds);
    }

    const unreadNotificationsCount = notifications.filter(n => !n.read).length;
    console.log(notifications)
    const notificationsIcon =
        notifications && notifications.length > 0 && unreadNotificationsCount ?
            <Badge badgeContent={unreadNotificationsCount} color="secondary">
                <NotificationsIcon color="default" />
            </Badge> :
            <NotificationsIcon color="default" />

    let notificationsMarkup =
        notifications && notifications.length > 0 ? (
            notifications.map((not) => {
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = moment(not.createdAt).fromNow();
                const iconColor = not.read ? 'primary' : 'secondary';
                const icon =
                    not.type === 'like' ? (
                        <Favorite color={iconColor} style={{ marginRight: 10 }} />
                    ) : (
                            <Chat color={iconColor} style={{ marginRight: 10 }} />
                        );

                return (
                    <MenuItem key={not.createdAt} onClick={handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            color="default"
                            variant="body1"
                            to={`/users/${not.recipient}/scream/${not.screamId}`}
                        >
                            {not.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                );
            })
        ) : (
                <MenuItem onClick={handleClose}>
                    You have no notifications yet
                </MenuItem>
            );
    return (
        <>
            {/* <Tooltip placement="top" title="Notifications">
                <IconButton
                    aria-owns={anchorEl ? 'simple-menu' : 'undefined'}
                    aria-haspopup="true"
                    onClick={handleOpen}
                >
                    {notificationsIcon}
                </IconButton>
            </Tooltip>
            <Menu
                anhorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu> */}
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
