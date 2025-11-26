import React, { useState } from "react";
import { IconFilter, IconSearch, IconChevronDown } from "@tabler/icons-react";

export default function FilterIncidents() {
    const [severity, setSeverity] = useState("all");
    const [status, setStatus] = useState("all");
    const [dateRange, setDateRange] = useState("all");
    const [location, setLocation] = useState("");

    const incidents = [
        { id: 1, title: "Traffic Accident", severity: "high", status: "verified", location: "Main St", date: "2023-10-15", time: "14:00" },
        { id: 2, title: "Fire Alarm", severity: "critical", status: "pending", location: "Elm St", date: "2023-10-15", time: "15:00" },
        { id: 3, title: "Theft Report", severity: "medium", status: "verified", location: "Oak Ave", date: "2023-10-14", time: "10:30" },
        { id: 4, title: "Vandalism", severity: "low", status: "resolved", location: "Pine Rd", date: "2023-10-14", time: "08:15" },
        { id: 5, title: "Medical Emergency", severity: "critical", status: "verified", location: "Cedar Ln", date: "2023-10-13", time: "16:45" },
    ];

    const filteredIncidents = incidents.filter((incident) => {
        if (severity !== "all" && incident.severity !== severity) return false;
        if (status !== "all" && incident.status !== status) return false;
        if (location && !incident.location.toLowerCase().includes(location.toLowerCase())) return false;
        return true;
    });

    const getSeverityColor = (severity) => {
        switch (severity) {
            case "critical": return "bg-red-500";
            case "high": return "bg-orange-500";
            case "medium": return "bg-yellow-500";
            case "low": return "bg-green-500";
            default: return "bg-gray-500";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "verified": return "text-green-600 bg-green-100";
            case "pending": return "text-yellow-600 bg-yellow-100";
            case "resolved": return "text-blue-600 bg-blue-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        Filter Incidents
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Filter and search through reported incidents
                    </p>
                </div>

                {/* Filter Controls */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Severity Filter */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Severity
                            </label>
                            <select
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Severities</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="verified">Verified</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Date Range
                            </label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>

                        {/* Location Search */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Location
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search location..."
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full px-4 py-2 pl-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <IconSearch className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Showing {filteredIncidents.length} of {incidents.length} incidents
                        </p>
                        <button
                            onClick={() => {
                                setSeverity("all");
                                setStatus("all");
                                setDateRange("all");
                                setLocation("");
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                </div>

                {/* Incidents List */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-neutral-100 dark:bg-neutral-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                                    Incident
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                                    Severity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                            {filteredIncidents.map((incident) => (
                                <tr key={incident.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                            {incident.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${getSeverityColor(incident.severity)}`} />
                                            <span className="text-sm text-neutral-900 dark:text-neutral-100 capitalize">
                                                {incident.severity}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                                            {incident.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                                        {incident.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                                        {incident.date} {incident.time}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
