const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'heroes-25ad3.appspot.com',
});
const bucket = admin.storage().bucket();
const db = admin.firestore();

module.exports = { admin, db, bucket };
