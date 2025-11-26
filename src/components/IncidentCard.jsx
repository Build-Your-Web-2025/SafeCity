import React from 'react';

const IncidentCard = ({ incident }) => {
    return (
        <div className="incident-card">
            <h3>{incident.title}</h3>
            <p>{incident.description}</p>
            <span>{new Date(incident.createdAt.seconds * 1000).toLocaleDateString()}</span>
        </div>
    );
};

export default IncidentCard;
