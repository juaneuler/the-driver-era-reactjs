// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAoebOI-wNE0fASmehcpJeyzauLg2RQt8",
  authDomain: "the-driver-era-e9509.firebaseapp.com",
  projectId: "the-driver-era-e9509",
  storageBucket: "the-driver-era-e9509.appspot.com",
  messagingSenderId: "131527248879",
  appId: "1:131527248879:web:d1787c9e48eb8c6775041a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)