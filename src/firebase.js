import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC0yVeu7YVHig2Og2JVlWEHuVlFyzBLbsw",
    authDomain: "instagram-clone-react-e12d7.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-e12d7.firebaseio.com",
    projectId: "instagram-clone-react-e12d7",
    storageBucket: "instagram-clone-react-e12d7.appspot.com",
    messagingSenderId: "71994285959",
    appId: "1:71994285959:web:92c37a9d13943618743d22",
    measurementId: "G-4MBN0Q0YW3"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };