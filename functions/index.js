const functions = require('firebase-functions');

const app = require('express')();

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, signin, uploadImage, addUserDetails } = require('./handlers/users');
const FBAuth = require('./util/fbAuth')

//scream routes
app.get('/screams', getAllScreams);
app.post('/screams', FBAuth, postOneScream);

//users Route
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/user/image', uploadImage);
app.post('/user', addUserDetails)
//http://europe-west1-chat-app-ebabf.cloudfunctions.net/api
exports.api = functions.region('europe-west1').https.onRequest(app);