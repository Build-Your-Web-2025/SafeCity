import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconFilter, IconSearch, IconArrowLeft, IconLoader } from "@tabler/icons-react";
import useIncidents from "../hooks/useIncidents"; // Import the real-time hook

export default function FilterIncidents() {
    const navigate = useNavigate();
    
    // 1. Fetch real data
    const { incidents, loading } = useIncidents();

    // Filter States
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [dateRange, setDateRange] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Categories matching your Report Form
    const categories = ['Road Issue', 'Crime', 'Fire', 'Medical', 'Civic Issue', 'Other'];

    // 2. Helper to format Firestore Timestamps
    const formatDateTime = (timestamp) => {
        if (!timestamp) return { date: 'N/A', time: '' };
        const dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return {
            date: dateObj.toLocaleDateString(),
            time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    // 3. Filtering Logic
    const filteredIncidents = incidents.filter((incident) => {
        // Filter by Category
        if (category !== "all" && incident.category !== category) return false;
        
        // Filter by Status (Open, Resolved, etc.)
        // We map boolean 'verified' to status for display if 'status' field is missing
        const currentStatus = incident.status || (incident.verified ? 'Verified' : 'Pending');
        if (status !== "all" && currentStatus.toLowerCase() !== status.toLowerCase()) return false;

        // Filter by Search Term (Title or Description)
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const titleMatch = incident.title?.toLowerCase().includes(term);
            const descMatch = incident.description?.toLowerCase().includes(term);
            if (!titleMatch && !descMatch) return false;
        }

        // Date Logic (Simple implementation for "Today")
        if (dateRange === "today") {
            const dateObj = incident.timestamp?.toDate ? incident.timestamp.toDate() : new Date(incident.timestamp);
            const today = new Date();
            if (dateObj.toDateString() !== today.toDateString()) return false;
        }

        return true;
    });

    // Helper for Badge Colors
    const getCategoryColor = (cat) => {
        switch (cat) {
            case "Fire": return "bg-red-500";
            case "Medical": return "bg-rose-500";
            case "Crime": return "bg-purple-500";
            case "Road Issue": return "bg-orange-500";
            default: return "bg-blue-500";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-950 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Header with Back Button */}
                <div className="mb-8 flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="p-2 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-sm transition-colors"
                    >
                        <IconArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                            Filter Incidents
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Search and analyze community reports in real-time.
                        </p>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="open">Open</option>
                                <option value="verified">Verified</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                Date Range
                            </label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                Search
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search title or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2.5 pl-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <IconSearch className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center border-t border-neutral-200 dark:border-neutral-800 pt-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Showing <span className="font-bold">{filteredIncidents.length}</span> results
                        </p>
                        <button
                            onClick={() => {
                                setCategory("all");
                                setStatus("all");
                                setDateRange("all");
                                setSearchTerm("");
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                </div>

                {/* Incidents Table / List */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    {loading ? (
                        <div className="p-12 flex flex-col items-center justify-center text-neutral-500">
                            <IconLoader className="w-8 h-8 animate-spin mb-2" />
                            <p>Loading real-time data...</p>
                        </div>
                    ) : filteredIncidents.length === 0 ? (
                        <div className="p-12 text-center text-neutral-500">
                            <p>No incidents found matching your filters.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-neutral-50 dark:bg-neutral-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                            Incident Detail
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                            Coordinates
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                    {filteredIncidents.map((incident) => {
                                        const { date, time } = formatDateTime(incident.timestamp);
                                        return (
                                            <tr key={incident.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                                        {incident.title}
                                                    </div>
                                                    <div className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[200px] truncate">
                                                        {incident.description}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2.5 h-2.5 rounded-full ${getCategoryColor(incident.category)}`} />
                                                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                                            {incident.category}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {incident.verified ? (
                                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                                                    {incident.location ? 
                                                        `${incident.location.lat.toFixed(4)}, ${incident.location.lng.toFixed(4)}` : 
                                                        'N/A'
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-neutral-900 dark:text-neutral-100">{date}</div>
                                                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{time}</div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}