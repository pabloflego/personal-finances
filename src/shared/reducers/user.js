import {reducerFactory} from '../util';

export const actionTypes = {
  AUTH_STATE_CHANGED: 'USER_AUTH_STATE_CHANGED',
  AUTHENTICATE: 'USER_AUTHENTICATE',
  AUTH_SUCCESS: 'USER_AUTH_SUCCESS',
  AUTH_ERROR: 'USER_AUTH_ERROR',
  UPDATE_FB: 'USER_UPDATE_FB',
  UPDATE_FB_SUCCESS: 'USER_UPDATE_FB_SUCCESS',
  ERROR: 'USER_ERROR',
  GET_PROFILE: 'USER_GET_PROFILE',
  SET_PROFILE: 'USER_SET_PROFILE',
};

// Action Creators
export const userAuthStateChanged = (user) => ({type: actionTypes.AUTH_STATE_CHANGED, user: user.toJSON()});
export const userAuthenticate = () => ({type: actionTypes.AUTHENTICATE}); // -> Saga
export const userAuthSuccess = (user, additionalUserInfo) => ({
  type: actionTypes.AUTH_SUCCESS, user: user.toJSON(), additionalUserInfo,
});
export const userAuthError = (error) => ({type: actionTypes.AUTH_ERROR, error});
export const userUpdateFromFb = (uid, additionalUserInfo) => ({type: actionTypes.UPDATE_FB, additionalUserInfo, uid}); // -> Saga
export const userUpdateFromFbSuccess = (res) => ({type: actionTypes.UPDATE_FB_SUCCESS, res});
export const userError = (error) => ({type: actionTypes.ERROR, error});
export const userGetProfile = (uid) => ({type: actionTypes.GET_PROFILE, uid});
export const userSetProfile = (profile) => ({type: actionTypes.SET_PROFILE, profile});


const actionHandlers = {
  [actionTypes.AUTH_STATE_CHANGED]: (state, {user}) => ({...state, ...user}),
  [actionTypes.AUTH_SUCCESS]: (state, {user, additionalUserInfo}) => ({...state, ...user, additionalUserInfo}),
  [actionTypes.AUTH_ERROR]: (state, {error}) => ({error}),
  [actionTypes.UPDATE_FB_SUCCESS]: (state, {res}) => ({...state, res}),
  [actionTypes.ERROR]: (state, {error}) => ({error}),
  [actionTypes.SET_PROFILE]: (state, {profile}) => ({...state, profile}),
};

export default reducerFactory(actionHandlers);