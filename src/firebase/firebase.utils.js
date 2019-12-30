import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBoBxkilqbvobwUI_-SBCLaksNX_ojZhQU",
    authDomain: "crown-db-26c1b.firebaseapp.com",
    databaseURL: "https://crown-db-26c1b.firebaseio.com",
    projectId: "crown-db-26c1b",
    storageBucket: "crown-db-26c1b.appspot.com",
    messagingSenderId: "348508950942",
    appId: "1:348508950942:web:c6b8eaf83c61cf7938c68f",
    measurementId: "G-NZS5NFB4KW"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;