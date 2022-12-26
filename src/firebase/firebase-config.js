// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5PVb8TCCd4P8JMpBTk2x_QTfcBgp_H64",
  authDomain: "monkey-blogging-26715.firebaseapp.com",
  projectId: "monkey-blogging-26715",
  storageBucket: "monkey-blogging-26715.appspot.com",
  messagingSenderId: "379480033917",
  appId: "1:379480033917:web:2fa1688fa6656ffd033f14",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
