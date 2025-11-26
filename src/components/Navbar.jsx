import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { logoutUser } from '../services/authService';

const Navbar = () => {
    const { user } = useAuth();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">SafeCity</Link>
            </div>
            <div className="navbar-menu">
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/report">Report Incident</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
