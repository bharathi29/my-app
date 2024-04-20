import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDX9sGkLihmvQ_FtF6XVHieu69OMATHhGo",
    authDomain: "rayresist1.firebaseapp.com",
    projectId: "rayresist1",
    storageBucket: "rayresist1.appspot.com",
    messagingSenderId: "434156618367",
    appId: "1:434156618367:web:b919d005193e5f6f6f354a",
    measurementId: "G-EVBP0EMP6K"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export {firebase};