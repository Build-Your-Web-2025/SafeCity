import React from 'react';

const ImageUploader = ({ onUpload }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="image-uploader">
            <input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default ImageUploader;
