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

exports.api = functions.region('europe-west1').https.onRequest(app)