// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
///// New versions////
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5GUIyNBsxKQyxs4gQijWQXi194q0iN1o",
  authDomain: "almasila-kart3.firebaseapp.com",
  projectId: "almasila-kart3",
  storageBucket: "almasila-kart3.appspot.com",
  messagingSenderId: "104782576665",
  appId: "1:104782576665:web:3ba57570ac9d57bc96fe88",
  measurementId: "G-0G3ZMSNFN9"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};