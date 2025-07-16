import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPqDJH3_tBJoOlBy_qp5byvfhDNQYL-5g",
  authDomain: "mi-gestion-app-6a633.firebaseapp.com",
  projectId: "mi-gestion-app-6a633",
  storageBucket: "mi-gestion-app-6a633.firebasestorage.app",
  messagingSenderId: "167745436245",
  appId: "1:167745436245:web:2b13025250e98f873af2dc"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();