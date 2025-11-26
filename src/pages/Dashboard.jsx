import React from 'react';
import MapView from '../components/MapView';
import IncidentCard from '../components/IncidentCard';
import { useIncidents } from '../hooks/useIncidents';

const Dashboard = () => {
    const { incidents, loading } = useIncidents();

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <MapView />
            <div className="incidents-list">
                {incidents.map(incident => (
                    <IncidentCard key={incident.id} incident={incident} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
