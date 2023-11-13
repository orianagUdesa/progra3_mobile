import app from "firebase/app";
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4WP8c72XoXsXClB8icKhslzJegb-Acas",
    authDomain: "proyectointegrador-4462c.firebaseapp.com",
    projectId: "proyectointegrador-4462c",
    storageBucket: "proyectointegrador-4462c.appspot.com",
    messagingSenderId: "888555400879",
    appId: "1:888555400879:web:e94848f514cb61db842e5a"
  };

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();