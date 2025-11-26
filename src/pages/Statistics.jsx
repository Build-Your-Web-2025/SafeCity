import React from "react";
import { IconTrendingUp, IconAlertTriangle, IconCheck, IconClock } from "@tabler/icons-react";

export default function Statistics() {
    const stats = [
        { label: "Total Incidents", value: "1,234", change: "+12%", icon: IconAlertTriangle, color: "blue" },
        { label: "Resolved", value: "892", change: "+8%", icon: IconCheck, color: "green" },
        { label: "Pending", value: "234", change: "-5%", icon: IconClock, color: "yellow" },
        { label: "Critical", value: "108", change: "+15%", icon: IconTrendingUp, color: "red" },
    ];

    const severityData = [
        { label: "Low", value: 245, percentage: 20, color: "bg-green-500" },
        { label: "Medium", value: 456, percentage: 37, color: "bg-yellow-500" },
        { label: "High", value: 425, percentage: 34, color: "bg-orange-500" },
        { label: "Critical", value: 108, percentage: 9, color: "bg-red-500" },
    ];

    const monthlyData = [
        { month: "Jan", incidents: 120 },
        { month: "Feb", incidents: 145 },
        { month: "Mar", incidents: 132 },
        { month: "Apr", incidents: 178 },
        { month: "May", incidents: 165 },
        { month: "Jun", incidents: 198 },
        { month: "Jul", incidents: 210 },
        { month: "Aug", incidents: 189 },
        { month: "Sep", incidents: 234 },
        { month: "Oct", incidents: 256 },
        { month: "Nov", incidents: 198 },
        { month: "Dec", incidents: 175 },
    ];

    const maxIncidents = Math.max(...monthlyData.map(d => d.incidents));

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        Statistics
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Overview of incident reports and trends
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center justify-between mb-4">
                                <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
                                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Severity Distribution */}
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                            Incidents by Severity
                        </h2>
                        <div className="space-y-4">
                            {severityData.map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            {item.label}
                                        </span>
                                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                            {item.value} ({item.percentage}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
                                        <div
                                            className={`${item.color} h-3 rounded-full transition-all duration-500`}
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Monthly Trend */}
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                            Monthly Trend (2023)
                        </h2>
                        <div className="flex items-end justify-between h-64 gap-2">
                            {monthlyData.map((data, idx) => (
                                <div key={idx} className="flex flex-col items-center flex-1">
                                    <div className="w-full flex items-end justify-center h-full">
                                        <div
                                            className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-all cursor-pointer"
                                            style={{ height: `${(data.incidents / maxIncidents) * 100}%` }}
                                            title={`${data.month}: ${data.incidents} incidents`}
                                        />
                                    </div>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                                        {data.month}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        {[
                            { action: "New incident reported", location: "Main St", time: "5 minutes ago", type: "high" },
                            { action: "Incident resolved", location: "Elm St", time: "1 hour ago", type: "resolved" },
                            { action: "Critical alert", location: "Oak Ave", time: "2 hours ago", type: "critical" },
                            { action: "Incident verified", location: "Pine Rd", time: "3 hours ago", type: "verified" },
                            { action: "New incident reported", location: "Cedar Ln", time: "4 hours ago", type: "medium" },
                        ].map((activity, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${activity.type === 'critical' ? 'bg-red-500' :
                                            activity.type === 'high' ? 'bg-orange-500' :
                                                activity.type === 'resolved' ? 'bg-green-500' :
                                                    activity.type === 'verified' ? 'bg-blue-500' :
                                                        'bg-yellow-500'
                                        }`} />
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                            {activity.location}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                    {activity.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
