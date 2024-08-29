// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkHDusdj0ZOJTXqfhKHWOM8ayDZ1nIS-M",
  authDomain: "react-ecommerse-ff9e3.firebaseapp.com",
  projectId: "react-ecommerse-ff9e3",
  storageBucket: "react-ecommerse-ff9e3.appspot.com",
  messagingSenderId: "720772598441",
  appId: "1:720772598441:web:c34fb12f6a2b85fffbb7b8",
  measurementId: "G-SEJWCSS3TH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
