
const { db } = require('./../util/admin');

const config = require('./../util/config');
const firebase = require('firebase');
firebase.initializeApp(config)

const { validateSignupData, validateSigninData } = require('./../util/validators')

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    const { errors, valid } = validateSignupData(newUser);
    if (!valid) return res.status(400).json({ errors })

    const noImg = 'no-image.jpg';

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
                imgUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
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
}


exports.signin = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { errors, valid } = validateSigninData(user);
    if (!valid) res.status(400).json({ errors })

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
}

exports.uploadImage = (req, res) => {
    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");
  
    const busboy = new BusBoy({ headers: req.headers });
  
    let imageToBeUploaded = {};
    let imageFileName;
    // String for image token
    let generatedToken = uuid();
  
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(fieldname, file, filename, encoding, mimetype);
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return res.status(400).json({ error: "Wrong file type submitted" });
      }
      // my.image.png => ['my', 'image', 'png']
      const imageExtension = filename.split(".")[filename.split(".").length - 1];
      // 32756238461724837.png
      imageFileName = `${Math.round(
        Math.random() * 1000000000000
      ).toString()}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
              //Generate token to be appended to imageUrl
              firebaseStorageDownloadTokens: generatedToken,
            },
          },
        })
        .then(() => {
          // Append token to url
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
          return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
        })
        .then(() => {
          return res.json({ message: "image uploaded successfully" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: "something went wrong" });
        });
    });
    busboy.end(req.rawBody);
  };

// exports.uploadImage = () => {
//     const Busboy = require('busboy');
//     const path = require('path');
//     const os = require('os');
//     const fs = require('fs');

//     const busboy = new Busboy({ headers: req.headers });
//     busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//         const imageExtension = filename.split('.')[1];
//         //example: 123459g8.png
//         const imageFileName = `${Math.round(Math.random() * 100000000000)}.${imageExtension}`;
//         const filePath = path.join(os.tmpdir(), imageFileName);
//         const imageToBeUploaded = { filePath, mimetype };
//         file.pipe(fs.createWriteStream(filepath))
//     });

//     busboy.on('finish', () => {
//         admin.storage().bucket().upload(imageToBeUploaded.filePath, {
//             resumable: false,
//             metadata: {
//                 metadata: {
//                     contentType: imageToBeUploaded.mimeType
//                 }
//             }
//         })
//             .then(() => {
//                 const imageUrl =`https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
//                 return db.doc(`/users/${req.user.handle}`).update({ imageUrl })
//             })
//             .then(() => {
//                 return res.json({ message: 'image uploaded successfully' })
//             })
//             .catch(err => {
//                 console.error(err);
//                 return res.status(500).json({ error: err.code })
//             })
//     })
// }