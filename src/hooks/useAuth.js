// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore'; // These modular functions are correctly imported

/**
 * Task 4: Hook to listen to Firebase Auth state and fetch user details/role.
 */
const useAuth = () => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Task 4: Listen to Firebase onAuthStateChanged()
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                // User logged in, fetch their role from Firestore
                try {
                    // 🚨 FIX APPLIED HERE 🚨
                    // 1. Define the document reference using V9 syntax
                    const userRef = doc(db, 'users', firebaseUser.uid);
                    
                    // 2. Fetch the document using V9 syntax
                    const userDoc = await getDoc(userRef);
                    
                    // Old V8 syntax was: const userDoc = await db.collection('users').doc(firebaseUser.uid).get();

                    if (userDoc.exists()) { // V9 uses .exists() method
                        const userData = userDoc.data();
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            name: userData.name,
                            role: userData.role || 'user', // Default safety
                        });
                    } else {
                        // Fallback case
                        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: 'user' });
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: 'user' });
                }
            } else {
                // User logged out
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Task 4: Return realtime currentUser and loading state
    return { user, loading };
};

export default useAuth;