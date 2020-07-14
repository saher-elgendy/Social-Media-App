const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const app = require('express')();

const firebaseConfig = {
  apiKey: "AIzaSyC85eU0g7ZK4hI6Di4P75LsW7sp2rA0AfU",
  authDomain: "chat-app-ebabf.firebaseapp.com",
  databaseURL: "https://chat-app-ebabf.firebaseio.com",
  projectId: "chat-app-ebabf",
  storageBucket: "chat-app-ebabf.appspot.com",
  messagingSenderId: "275570619276",
  appId: "1:275570619276:web:bcd8bbec20d8006ea05ca9",
  measurementId: "G-W3WMZ926K1"
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.post('/signup', (req, res) => {
  const newUser = {
    emai: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }

  let token, userId;
  db.doc(`/users/${newUser.handle}`).get().then(doc => {
    if (doc.exists) {
      return res.status(400).json({ handle: 'this handle already exists' })
    } else {
      return firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password)
    }
  })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new date().toISOString(),
        userId
      }

      return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      if(err.code === "auth/email-already-in-use") {
        return res.status(400).json({email: 'Email is alrready in use'})
      } else {
        return res.status(500).json({general: 'something went wrong, please try again'})
      }
    })
})

exports.api = functions.region('europe-west1').https.onRequest(app)