// src/services/authService.js

import { auth, db, firebase } from '../firebase/config';
import { 
    GoogleAuthProvider, 
    RecaptchaVerifier, 
    signInWithPopup, 
    signInWithPhoneNumber 
} from 'firebase/auth';

// 🚨 Add V9 Firestore imports needed for saving user data 🚨
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; 

const USERS_COLLECTION = 'users';

// --- Helper: Save User Details to Firestore ---
// This is critical for storing the 'role' field.
const saveUserDetails = async (uid, email, name, role = 'user') => {
    
    // 🚨 FIX APPLIED HERE 🚨
    // OLD V8: await db.collection(USERS_COLLECTION).doc(uid).set({...}, { merge: true });
    
    // NEW V9 Modular Syntax:
    const userRef = doc(db, USERS_COLLECTION, uid);

    await setDoc(userRef, {
        name,
        email,
        role, // Default role is 'user'
        createdAt: serverTimestamp(), // Use imported modular serverTimestamp
    }, { merge: true });
};

// --- Register User ---
export const registerUser = async (email, password, name) => {
    try {
        const response = await auth.createUserWithEmailAndPassword(email, password);
        const { user } = response;
        
        // Task 2: Save user to Firestore after successful registration
        await saveUserDetails(user.uid, email, name, 'user');

        return { success: true, user };
    } catch (error) {
        console.error("Registration Error:", error);
        return { success: false, error: error.message };
    }
};

// --- Login User ---
export const loginUser = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        return { success: true };
    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, error: error.message };
    }
};

// --- Google Sign-In (Update the function body) ---
export const signInWithGoogle = async () => {
    // FIX: Use the directly imported GoogleAuthProvider class
    const provider = new GoogleAuthProvider(); 
    return signInWithPopup(auth, provider); // Use the modular signInWithPopup
};

// --- ReCAPTCHA Setup (Update the function body) ---
export const setupRecaptcha = (elementId) => {
    // FIX: Use the directly imported RecaptchaVerifier class
    return new RecaptchaVerifier(auth, elementId, {
        size: 'invisible',
        callback: (response) => {
            console.log("reCAPTCHA solved");
        }
    });
};

// --- Phone Sign-In (Update the function body) ---
export const signInWithPhone = (phoneNumber, recaptchaVerifier) => {
    // FIX: Use the directly imported signInWithPhoneNumber function
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

// --- Logout User ---
export const logoutUser = async () => {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        console.error("Logout Error:", error);
        return { success: false, error: error.message };
    }
};