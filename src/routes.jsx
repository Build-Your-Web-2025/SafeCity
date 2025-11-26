import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportIncident from './pages/ReportIncident';
import AdminPanel from './pages/AdminPanel';

// Imports from the incoming remote branch (Keep these)
import UserReports from './pages/UserReports';
import FilterIncidents from './pages/FilterIncidents';
import Statistics from './pages/Statistics';
import AppSettings from './pages/AppSettings';

// Use your local default import (Matches your useAuth.js file)
import useAuth from './hooks/useAuth'; 

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Core Routes */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/report"
                element={
                    <PrivateRoute>
                        <ReportIncident />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminPanel />
                    </PrivateRoute>
                }
            />

            {/* New Routes from Remote Branch */}
            <Route
                path="/user-reports"
                element={
                    <PrivateRoute>
                        <UserReports />
                    </PrivateRoute>
                }
            />
            <Route
                path="/filter-incidents"
                element={
                    <PrivateRoute>
                        <FilterIncidents />
                    </PrivateRoute>
                }
            />
            <Route
                path="/statistics"
                element={
                    <PrivateRoute>
                        <Statistics />
                    </PrivateRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <PrivateRoute>
                        <AppSettings />
                    </PrivateRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
};

export default AppRoutes;