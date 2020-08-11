import { IconButton, Tooltip } from '@material-ui/core';
import React from 'react';

const ReusableButton = ({ children, onClick, title, btnClasses, tipClasses }) => {
    return (
        <Tooltip title={title} className={tipClasses} placement="top">
            <IconButton
                onClick={onClick}
                className={btnClasses}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
}

export default ReusableButton;
