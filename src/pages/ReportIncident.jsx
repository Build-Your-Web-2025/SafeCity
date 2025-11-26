import React, { useState } from 'react';
import { reportIncident } from '../services/incidentService';
import ImageUploader from '../components/ImageUploader';
import LocationButton from '../components/LocationButton';

const ReportIncident = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location) {
            alert("Please select a location");
            return;
        }
        await reportIncident({ title, description, location });
        // Redirect or show success
    };

    return (
        <div className="report-incident">
            <h2>Report Incident</h2>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <LocationButton onLocationFound={setLocation} />
                {location && <p>Location selected: {location.lat}, {location.lng}</p>}
                <ImageUploader onUpload={(file) => console.log(file)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ReportIncident;
