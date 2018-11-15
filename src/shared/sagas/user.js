import {put, takeLatest} from 'redux-saga/effects';
import {facebookAuthProvider, fireAuth, fireDb} from '../firebase';
import {UserException} from '../errors';

import {
  actionTypes,
  userAuthError,
  userAuthSuccess,
  userError,
  userGetProfile,
  userSetProfile,
  userUpdateFromFb,
  userUpdateFromFbSuccess,
} from '../reducers/user';

const FIRESTORE_KEY = 'users';

/**
 * Update profile data on any auth state change
 * @param user
 * @returns {IterableIterator<*|PutEffect<{type, uid}>>}
 */
function* userAuthStateChangedSaga({user}) {
  yield put(userGetProfile(user.uid));
}

/**
 * Authenticate Users. Facebook only at the moment
 * TODO: Support more auth providers at least email and google
 * @returns {IterableIterator<*>}
 */
function* userAuthenticateSaga(/*action*/) {
  try {
    const {user, additionalUserInfo} = yield fireAuth.signInWithPopup(facebookAuthProvider)
      .then(({user, additionalUserInfo}, error) => {
        if (error) {
          console.log(error);
        } else {
          return {user, additionalUserInfo};
        }
      });
    yield put(userAuthSuccess(user));
    yield put(userUpdateFromFb(user.uid, additionalUserInfo));
  } catch (error) {
    yield put(userAuthError(error));
  }
}

/**
 * Save addition user info retrieved from Facebook
 * @param additionalUserInfo
 * @param uid
 * @returns {IterableIterator<*>}
 */
function* userUpdateFromFacebookSaga({additionalUserInfo, uid}) {
  console.log(additionalUserInfo.profile);
  // TODO: Avoid overwrite on each login, shallow compare?
  try {
    const {
      email = null,
      first_name: firstName = null,
      id: facebookId,
      // {picture: data:{}}, // Facebook Profile picture
      last_name: lastName = null,
      middle_name: midName = null,
      name: fullName,
    } = additionalUserInfo.profile;
    const profile = {email, firstName, lastName, facebookId, midName, fullName};
    // Update the user data
    yield fireDb.collection(FIRESTORE_KEY).doc(uid).set(profile, {merge: true});
    // Update Successful
    yield put(userUpdateFromFbSuccess());
    yield put(userSetProfile(profile));
  } catch (error) {
    yield put(userError(error));
  }
}

/**
 * Get Profile data
 * @param uid
 * @returns {IterableIterator<*>}
 */
function* userGetProfileSaga({uid}) {
  try {
    const profile = yield fireDb.collection(FIRESTORE_KEY).doc(uid).get()
      .then(doc => {
        if (!doc.exists) { // Make sure the user exists
          throw new UserException('No user associated to that uid');
        }
        return doc.data();
      });
    // Set the profile object
    yield put(userSetProfile(profile));
  } catch (error) {
    yield put(userError(error));
  }
}

export default function* saga() {
  yield takeLatest(actionTypes.AUTH_STATE_CHANGED, userAuthStateChangedSaga);
  yield takeLatest(actionTypes.AUTHENTICATE, userAuthenticateSaga);
  yield takeLatest(actionTypes.UPDATE_FB, userUpdateFromFacebookSaga);
  yield takeLatest(actionTypes.GET_PROFILE, userGetProfileSaga);
}