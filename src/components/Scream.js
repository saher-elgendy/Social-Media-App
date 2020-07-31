import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

//dayjs
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar'

const useStyles = makeStyles({
    card: {
        display: 'flex',
        marginBottom: 20
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    image: {
        minWidth: 200,
    }
})

const Scream = (props) => {
    const { scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } = props;
    const classes = useStyles();

    dayjs.extend(calendar)
    return (
        <Card className={classes.card}>
            <CardMedia
                image={userImage}
                title="profile image"
                className={classes.image}
            />
            <CardContent className={classes.content}>
                <Typography
                    variant="h5"
                    color="primary"
                    component={Link}
                    to={`/user/${userHandle}`}
                >{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs().calendar(dayjs(createdAt))}</Typography>
                <Typography variant="body1">{body}</Typography>
            </CardContent>
        </Card>
    )
}

export default Scream;