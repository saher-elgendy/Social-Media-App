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

app.post('/screams', (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Body must not be empty' });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.body.handle,
    createdAt: new Date().toISOString()
  };

  db.collection('secondScream')
    .add(newScream)
    .then((doc) => {
      return res.status(201).json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
})

const isEmpty = (string) => string.trim() === '' ? true : false;

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
}

const FBAuth = (req, res, next) => {
  let idToken;
  if (req.headers.Authorization && req.headers.Authorization.startWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('no token found');
    return res.status(400).json({ error: 'unauthorized' })
  }

  admin.auth().verifyIdToken(idToken).then(decodedToken => {
    req.user = decodedToken;
    console.log(decodedToken);
    return db.collection('users').where('userId', '==', req.user.uid)
      .limit(1)
      .get();

  }).then(data => {
    req.user.handle = data.docs[0].data().handle;
    return next();
  })
  .catch(err => {
    console.error(err);
    return res.status(403).json(err)
  })
}


let errors = {};
app.post('/signup', FBAuth, (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.user.handle,
  };

  if(!isEmail(newUser.email)) errors.email =  'email is not valid';
  if(isEmpty(newuser.email)) errors.email = 'Must not be empty';
  if(isEmpty(newUser.password)) errors.password = 'Must mnot be empty';
  if(newUser.confirmPassword !== newUser.password) errors.confirmPassword = 'passwords must match';
  
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        //TODO Append token to imageUrl. Work around just add token from image in storage.
        // imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already is use" });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
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