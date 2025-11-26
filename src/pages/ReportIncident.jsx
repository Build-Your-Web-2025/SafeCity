import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addIncident } from '../services/incidentService';
import useAuth from '../hooks/useAuth';
import ImageUploader from '../components/ImageUploader';
import LocationButton from '../components/LocationButton';
import { 
    IconArrowLeft, 
    IconMapPin, 
    IconLoader, 
    IconAlertCircle, 
    IconCheck, 
    IconPhoto 
} from '@tabler/icons-react';

const ReportIncident = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Road Issue');
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = ['Road Issue', 'Crime', 'Fire', 'Medical', 'Civic Issue', 'Other'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!title || !description || !location) {
            setError("Please fill in all fields and select a location.");
            return;
        }

        setLoading(true);

        try {
            const incidentData = {
                title,
                description,
                category,
                location, // Contains { lat, lng }
                userId: user?.uid || 'anonymous',
                userEmail: user?.email || 'anonymous',
                status: 'Open',
                verified: false,
                // timestamp is handled by the server in incidentService
            };

            await addIncident(incidentData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError("Failed to submit report. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 py-10 px-4 flex items-center justify-center font-sans">
            <div className="max-w-3xl w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                
                {/* Header Section */}
                <div className="bg-neutral-50 dark:bg-neutral-800/50 px-8 py-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="p-2 -ml-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-neutral-600 dark:text-neutral-300"
                    >
                        <IconArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Report New Incident</h1>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                            Submit details to alert the community.
                        </p>
                    </div>
                </div>

                <div className="p-8">
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                            <IconAlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Title & Category Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                    Incident Title <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    placeholder="e.g. Large Pothole on Main St." 
                                    className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)} 
                                        className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-neutral-500">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                rows="4"
                                placeholder="Describe the incident details, severity, and immediate surroundings..." 
                                className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Location & Image Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Location Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <div className={`
                                    relative p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-colors
                                    ${location 
                                        ? 'border-green-500/50 bg-green-50/50 dark:bg-green-900/10' 
                                        : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800'}
                                `}>
                                    {location ? (
                                        <>
                                            <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                                <IconCheck className="w-6 h-6" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-bold text-green-700 dark:text-green-400">Location Locked</p>
                                                <p className="text-xs text-green-600/80 dark:text-green-400/70">
                                                    {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                                                </p>
                                            </div>
                                            {/* We can re-render button to allow update, or hide it. Keeping it simple. */}
                                            <div className="scale-75 opacity-70 hover:opacity-100 transition-opacity">
                                                <LocationButton onLocationFound={setLocation} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                <IconMapPin className="w-5 h-5" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Where did this happen?</p>
                                            </div>
                                            <LocationButton onLocationFound={setLocation} />
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                    Evidence (Optional)
                                </label>
                                <div className="h-full p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 flex flex-col items-center justify-center gap-2">
                                    <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center text-neutral-500">
                                        <IconPhoto className="w-5 h-5" />
                                    </div>
                                    <div className="w-full text-center">
                                        <ImageUploader onUpload={(file) => console.log(file)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <IconLoader className="w-5 h-5 animate-spin" />
                                        Submitting Report...
                                    </>
                                ) : (
                                    "Submit Incident Report"
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportIncident;