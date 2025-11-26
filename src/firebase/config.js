// src/firebase/config.js

// NOTE: We are using the V9 modular imports, BUT using the V9/compat libraries
// to expose the V8 API required by useAuth.js and authService.js.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, setDoc, query, onSnapshot, where, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Removed: Duplicate import of collection, doc, getDoc from the top

// Your web app's Firebase configuration (Kept unchanged)
const firebaseConfig = {
    apiKey: "AIzaSyBi4fMZdX__dPcGSih9zZ3we7LhDdcAaNg",
    authDomain: "safecity-f4797.firebaseapp.com",
    projectId: "safecity-f4797",
    storageBucket: "safecity-f4797.firebasestorage.app",
    messagingSenderId: "556687003976",
    appId: "1:556687003976:web:3f68876300f562d0d3a37d",
    measurementId: "G-443TB629SD"
};


// 1. Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 2. Export individual services (V9 objects)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// 3. CRUCIAL FIX: Export the 'app' object and rename it 'firebase' 
// This resolves the V8 dependency (e.g., firebase.firestore.FieldValue.serverTimestamp)
export const firebase = app;


// 4. Export all Modular Firestore Functions (Required by useAuth, authService, etc.)
// These must be exported so other files can use them via named imports.
export { 
    collection, 
    doc, 
    getDoc, 
    setDoc, 
    query, 
    onSnapshot, 
    where,
    serverTimestamp // Used for timestamp in Firestore
};