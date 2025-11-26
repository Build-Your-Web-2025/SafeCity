import React from "react";
import { useNavigate } from "react-router-dom";
import useUserIncidents from "../hooks/useuserIncedient";
import { IconArrowLeft, IconLoader, IconClock, IconMapPin, IconCheck, IconAlertCircle } from "@tabler/icons-react";

export default function UserReports() {
    const { incidents, loading } = useUserIncidents();
    const navigate = useNavigate();

    // Helper for date formatting
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Date pending...';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Helper for status badge colors
    const getStatusColor = (status, verified) => {
        if (verified) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
        switch (status) {
            case "Resolved": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
            case "In Progress": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
            default: return "bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-400 border-gray-200 dark:border-neutral-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-950 p-4 md:p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="p-2 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-colors"
                        >
                            <IconArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">My Reports</h1>
                            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                                Track the status of incidents you have reported.
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/report')}
                        className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all"
                    >
                        + New Report
                    </button>
                </div>

                {/* Content Area */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-neutral-500 dark:text-neutral-400">
                            <IconLoader className="w-8 h-8 animate-spin mb-3" />
                            <p>Loading your submissions...</p>
                        </div>
                    ) : incidents.length === 0 ? (
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center">
                            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconAlertCircle className="w-8 h-8 text-neutral-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No reports yet</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
                                You haven't submitted any incident reports yet. Be the first to help improve your community safety!
                            </p>
                            <button 
                                onClick={() => navigate('/report')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                            >
                                Report an Incident
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {incidents.map((incident) => (
                                <div 
                                    key={incident.id}
                                    className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        
                                        {/* Left Side: Icon & Content */}
                                        <div className="flex items-start gap-4">
                                            <div className={`
                                                w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl
                                                ${incident.category === 'Crime' ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : 
                                                  incident.category === 'Fire' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20' : 
                                                  'bg-blue-100 text-blue-600 dark:bg-blue-900/20'}
                                            `}>
                                                {/* Simple Icon mapping based on category */}
                                                {incident.category === 'Crime' ? '🚨' : 
                                                 incident.category === 'Fire' ? '🔥' : 
                                                 incident.category === 'Medical' ? '🚑' : '📝'}
                                            </div>
                                            
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-bold text-lg text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors">
                                                        {incident.title}
                                                    </h3>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(incident.status, incident.verified)}`}>
                                                        {incident.verified ? 'Verified' : (incident.status || 'Pending')}
                                                    </span>
                                                </div>
                                                
                                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-2">
                                                    {incident.description}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500">
                                                    <div className="flex items-center gap-1.5">
                                                        <IconClock className="w-4 h-4" />
                                                        {formatDate(incident.timestamp)}
                                                    </div>
                                                    {incident.location && (
                                                        <div className="flex items-center gap-1.5">
                                                            <IconMapPin className="w-4 h-4" />
                                                            {incident.location.lat.toFixed(4)}, {incident.location.lng.toFixed(4)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Status & Action */}
                                        {/* You can add Edit/Delete buttons here later if you want */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}