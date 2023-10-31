import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyB3ji2zcJg3Xo6rdFzvDKoaEBwKfAWgJVI",
  authDomain: "crwn-db-100a3.firebaseapp.com",
  projectId: "crwn-db-100a3",
  storageBucket: "crwn-db-100a3.appspot.com",
  messagingSenderId: "699280971610",
  appId: "1:699280971610:web:039285e052ec0c9619c563",
  measurementId: "G-HZ3HCMS6PN"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // console.log(snapShot);

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set(
        {
          displayName,
          email,
          createdAt,
          ...additionalData
        }
      )

    } catch (error) {
      console.log('error creating user', error.message);

    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;