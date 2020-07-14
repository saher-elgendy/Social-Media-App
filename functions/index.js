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


const isEmpty = (string) => string.trim() === '' ? true : false;

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
}

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }

  let errors = {};

  if(!isEmail(newUser.email)) errors.email = "email must be a valid email";
  if (isEmpty(newUser.email)) errors.email = "Must not be empty";
  if (isEmpty(newUser.password)) errors.password = "Must not be empty";
  if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = "passwords must match";
  if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";

  if (Object.keys(errors).length > 0) res.status(400).json({ errors })

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
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: 'Email is alrready in use' })
      } else {
        return res.status(500).json({ general: 'something went wrong, please try again' })
      }
    })
});

app.post('/signin', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.status(201).json({ token })
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'something went wrong' })
    })
})

exports.api = functions.region('europe-west1').https.onRequest(app)