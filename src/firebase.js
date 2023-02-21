// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB6-4TBeMuRHXjJhTNXfE3Mg8z5142gHbs",
    authDomain: "almasila-kart.firebaseapp.com",
    projectId: "almasila-kart",
    storageBucket: "almasila-kart.appspot.com",
    messagingSenderId: "998856417418",
    appId: "1:998856417418:web:6d1eadaa8db84aa0388d73",
    measurementId: "G-1M7QMM2ZRE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};