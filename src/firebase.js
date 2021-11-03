import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQnoFcA-qrk2NqjL0FfpCPAc_0fu8ojrw",
    authDomain: "expense-calculator-cdb96.firebaseapp.com",
    projectId: "expense-calculator-cdb96",
    storageBucket: "expense-calculator-cdb96.appspot.com",
    messagingSenderId: "593284739096",
    appId: "1:593284739096:web:a538a7f83ec1ee03d7936d"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

export {
    auth,
    db,
    
};