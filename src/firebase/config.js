// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuIR4TGXK2P9jlnwyTsLOAUFwWcMyDYdo",
  authDomain: "react-cursos-3d491.firebaseapp.com",
  projectId: "react-cursos-3d491",
  storageBucket: "react-cursos-3d491.appspot.com",
  messagingSenderId: "328154639022",
  appId: "1:328154639022:web:826c6cb460761773dc1b3f"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );