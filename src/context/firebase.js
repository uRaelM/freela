// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAYJSPitHEES-4JFbW6WmEWc8K5rcD5b4",
  authDomain: "freela-d5387.firebaseapp.com",
  projectId: "freela-d5387",
  storageBucket: "freela-d5387.appspot.com",
  messagingSenderId: "686089922716",
  appId: "1:686089922716:web:401c003186113d7ae32559",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, getDocs, query, where };
