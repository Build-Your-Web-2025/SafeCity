// src/services/authService.js

import { auth, db, firebase } from '../firebase/config';

const USERS_COLLECTION = 'users';

// --- Helper: Save User Details to Firestore ---
// This is critical for storing the 'role' field.
const saveUserDetails = async (uid, email, name, role = 'user') => {
    await db.collection(USERS_COLLECTION).doc(uid).set({
        name,
        email,
        role, // Default role is 'user'
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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