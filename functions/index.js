const functions = require('firebase-functions');
const { db } = require('./util/admin');
const FBAuth = require('./util/fbAuth');
const app = require('express')();

const {
    getAllScreams,
    postOneScream,
    getScream,
    commentOnScream,
    likeScream,
    unlikeScream,
    deleteScream,
} = require('./handlers/screams');

const {
    signup,
    signin,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
} = require('./handlers/users');

//scream routes
app.get('/screams', getAllScreams);
app.post('/screams', FBAuth, postOneScream);
app.get('/scream/:screamId', FBAuth, getScream);
app.delete('/scream/:screamId', FBAuth, deleteScream)
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);

//users Routes
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', FBAuth, getUserDetails);
//https://europe-west1-chat-app-ebabf.cloudfunctions.net/api
exports.api = functions.region('europe-west1').https.onRequest(app);

//create notification on like
exports.createNotificationOnLike = functions.region('europe-west1')
    .firestore
    .document('likes/{id}')
    .onCreate(snapshot => {
        db.doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then(doc => {
                if (doc.exists) {
                    return db.doc(`/notifications/${snapshot.id}`)
                        .set({
                            createdAt: new Date().toISOString(),
                            recipient: doc.data().userHandle,
                            sender: snapshot.data().userHandle,
                            type: 'like',
                            read: false,
                            screamId: doc.id
                        })
                } else {
                    return null;
                }
            })
            .then(() => {
                return;

            })
            .catch(err => {
                console.error(err);
                return;
            });
    });

exports.deleteNotificationOnUnlike = functions.region('europe-west1')
    .firestore
    .document('likes/{id}')
    .onDelete(snapshot => {
        db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            })
    })
//create notification on comment
exports.createNotificationOnComment = functions.region('europe-west1')
    .firestore
    .document('comments/{id}')
    .onCreate(snapshot => {
        db.doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then(doc => {
                if (doc.exists) {
                    return db.doc(`/notifications/${snapshot.id}`)
                        .set({
                            createdAt: new Date().toISOString(),
                            recipient: doc.data().userHandle,
                            sender: snapshot.data().userHandle,
                            type: 'comment',
                            read: false,
                            screamId: doc.id
                        })
                } else {
                    return null;
                }
            })
            .then(() => {
                return;

            })
            .catch(err => {
                console.error(err);
                return;
            });
    })