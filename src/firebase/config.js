// src/firebase/config.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// 🚨 IMPORTANT: Replace these placeholders with your actual Firebase Project Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBi4fMZdX__dPcGSih9zZ3we7LhDdcAaNg",
    authDomain: "safecity-f4797.firebaseapp.com",
    projectId: "safecity-f4797",
    storageBucket: "safecity-f4797.firebasestorage.app",
    messagingSenderId: "556687003976",
    appId: "1:556687003976:web:3f68876300f562d0d3a37d",
    measurementId: "G-443TB629SD"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Export the initialized modules for use throughout the project
export { auth, db, storage, firebase };
