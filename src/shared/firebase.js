/* global process:false  */
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {FirebaseDataProvider} from 'react-admin-firebase';
import {FirebaseAuthProvider} from 'ra-auth-firebase';

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

// react-admin Data Provider
export const dataProvider = FirebaseDataProvider(config);

// Firebase App's instance
export const fireApp = firebase.app();
// Firebase Auth's instance
export const fireAuth = firebase.auth();
// Firebase Db's instance
export const fireDb = firebase.firestore();
// Auth Provider Config
const authProviderConfig = {
  admin: {
    path: '/admin/',
    // validate: (user) => user.isAdmin && user.isEmployee // Validate that user may sign in (default () => true)
  },
  keys: {
    // Keys for local storage
    permissions: 'user',
    token: 'firebase',
  },
};

// react-admin Auth Provider
export const getAuthProvider = () => FirebaseAuthProvider(authProviderConfig);

// Facebook Auth Provider
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
facebookAuthProvider.addScope('public_profile');