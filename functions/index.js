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
    markNotificationsRead
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
app.post('/notifications', FBAuth, markNotificationsRead)
//https://europe-west1-chat-app-ebabf.cloudfunctions.net/api
exports.api = functions.region('europe-west1').https.onRequest(app);

//create notification on like
exports.createNotificationOnLike = functions.region('europe-west1')
    .firestore
    .document('likes/{id}')
    .onCreate(snapshot => {
        return db.doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
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
            .catch(err => {
                console.error(err);
                return;
            });
    });

exports.deleteNotificationOnUnlike = functions.region('europe-west1')
    .firestore
    .document('likes/{id}')
    .onDelete(snapshot => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
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
        return db.doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
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
                    return res.status(404).json({ error: 'Not found' });
                }
            })
            .catch(err => {
                console.error(err);
                return;
            });
    })

//this function change image on ll placesonce user change his image
exports.onUserImageChange = functions
    .region('europe-west1')
    .firestore.document(`/users/{userId}`)
    .onUpdate(change => {
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            let batch = db.batch();
            return db.collection('screams')
                .where('userHandle', '==', change.before.data().handle)
                .get()
                .then(data => {
                    data.forEach(doc => {
                        const scream = db.doc(`/screams/${doc.id}`);
                        batch.update(scream, { userImage: change.after.data().imageUrl })
                    });

                    return batch.commit();
                })
        } else {
            return true;
        }
    });
//this function remote likwa, comments,and notifications on screams deleted
exports.onScreamDelete = functions.region('europe-west1')
    .firestore.document(`/screams/{screamId}`)
    .onDelete((snapshot, context) => {
        const screamId = context.params.screamId;
        const batch = db.batch();

        return db.collection('comments').where('screamId', '==', screamId)
            .get()
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/comments/${doc.id}`))
                })
                return db.collection('likes').where('screamId', '==', screamId).get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/likes/${doc.id}`))
                });
                return db.collection('notifications').where('screamId', '==', screamId).get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`))
                })
                return batch.commit();
            })
            .catch(err => {
                console.error(err);
            });
    });
