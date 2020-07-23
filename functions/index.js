const functions = require('firebase-functions');

const app = require('express')();

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, signin, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');
const FBAuth = require('./util/fbAuth')

//scream routes
app.get('/screams', getAllScreams);
app.post('/screams', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);

//users Route
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser)
//http://europe-west1-chat-app-ebabf.cloudfunctions.net/api
exports.api = functions.region('europe-west1').https.onRequest(app);