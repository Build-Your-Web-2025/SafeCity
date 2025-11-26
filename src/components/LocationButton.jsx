import React from 'react';
import { getCurrentLocation } from '../services/locationService';

const LocationButton = ({ onLocationFound }) => {
    const handleClick = async () => {
        try {
            const location = await getCurrentLocation();
            onLocationFound(location);
        } catch (error) {
            console.error("Error getting location", error);
        }
    };

    return (
        <button onClick={handleClick} className="location-btn">
            Get Current Location
        </button>
    );
};

export default LocationButton;
