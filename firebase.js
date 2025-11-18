// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATPDMrOfa_4vYZRCfa3BPLy93_xLAvRaQ",
  authDomain: "renovation-f4744.firebaseapp.com",
  projectId: "renovation-f4744",
  storageBucket: "renovation-f4744.firebasestorage.app",
  messagingSenderId: "960677509876",
  appId: "1:960677509876:web:7e9677e322ec8698c27ca1",
  measurementId: "G-QPDS0400J3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
