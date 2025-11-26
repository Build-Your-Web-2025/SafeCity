import { auth } from '../firebase/config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'firebase/auth';

export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const setupRecaptcha = (elementId) => {
    return new RecaptchaVerifier(auth, elementId, {
        size: 'invisible',
        callback: (response) => {
            // reCAPTCHA solved
        }
    });
};

export const signInWithPhone = (phoneNumber, recaptchaVerifier) => {
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

export const logoutUser = () => {
    return signOut(auth);
};

export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback);
};
