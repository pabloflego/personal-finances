/* global process:false  */
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const {
  REACT_APP_FIREBASE_KEY,
  REACT_APP_FIREBASE_DOMAIN,
  REACT_APP_FIREBASE_DATABASE,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_SENDER_ID,
} = process.env;

// Setup Firebase Connection
export const config = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
};


// Firebase App instance
export const fireApp = firebase.initializeApp(config);
// Firebase Auth instance
export const fireAuth = firebase.auth();
// Firebase Firestore instance
export const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});

// Facebook Auth Provider
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
facebookAuthProvider.addScope('public_profile');
