import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Shared Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAW-Y9XtdA4qPlaerLBOZNvrc4AE_oBckU",
  authDomain: "oud-al-noor.firebaseapp.com",
  projectId: "oud-al-noor",
  storageBucket: "oud-al-noor.firebasestorage.app",
  messagingSenderId: "14242453518",
  appId: "1:14242453518:web:bf75abe06221e7ff1a845f",
  measurementId: "G-HTLSHHS8HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth aur Firestore Export
export const auth = getAuth(app);
export const db = getFirestore(app);