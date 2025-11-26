// src/context/AuthContext.jsx

import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

// Task 3: Create the Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { user, loading } = useAuth(); 

    // Helper for easy route protection
    const isAdmin = user && user.role === 'admin';

    const contextValue = {
        user,
        loading,
        isAdmin, // Task 3: Store user role
    };

    // Show a global loading screen while checking auth state
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
                Checking User Authentication...
            </div>
        );
    }

    // Task 3: Provide current user to all pages
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};