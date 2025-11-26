// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBi4fMZdX__dPcGSih9zZ3we7LhDdcAaNg",
    authDomain: "safecity-f4797.firebaseapp.com",
    projectId: "safecity-f4797",
    storageBucket: "safecity-f4797.firebasestorage.app",
    messagingSenderId: "556687003976",
    appId: "1:556687003976:web:3f68876300f562d0d3a37d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
