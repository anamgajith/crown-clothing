import { takeLatest, call, put, all } from "redux-saga/effects";

import UserActionTypes from "./user.types";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from "./user.action";

import {
  signInWithGoogle,
  createUserProfileDocument,
  auth
} from "../../firebase/firebase.utils";

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubScribe = auth.onAuthStateChanged(userAuth => {
      unsubScribe();
      resolve(userAuth);
    }, reject);
  });
};

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapShot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogles() {
  try {
    const { user } = yield signInWithGoogle();
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isAuthenticated() {
  try {
    const user = yield getCurrentUser();
    if (!user) return;
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapShotFromUserAuth(user, additionalData);
}

export function* onGoogleSignIn() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInWithGoogles);
}

export function* onEmailSignIn() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onUserSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignIn),
    call(onEmailSignIn),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onUserSignUpSuccess)
  ]);
}
