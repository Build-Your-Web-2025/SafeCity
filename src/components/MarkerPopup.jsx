import React from 'react';

const MarkerPopup = ({ incident }) => {
    return (
        <div className="marker-popup">
            <h3>{incident.title}</h3>
            <p>{incident.description}</p>
        </div>
    );
};

export default MarkerPopup;
