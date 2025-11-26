import React, { useState } from "react";
import { IconBell, IconLock, IconDatabase, IconCreditCard, IconTrash } from "@tabler/icons-react";

export default function AppSettings() {
    const [notifications, setNotifications] = useState({
        realTime: true,
        dailySummaries: true,
        criticalUpdates: true,
    });

    const [security, setSecurity] = useState({
        suspiciousActivity: true,
        accessPermissions: true,
        inactiveUsers: true,
        twoFactor: true,
        auditLogs: true,
    });

    const [verificationLevel, setVerificationLevel] = useState(50);

    const [dataManagement, setDataManagement] = useState({
        backupData: true,
        exportReports: true,
        archiveOld: true,
    });

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        Settings
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Manage your incident dashboard preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - User Preferences */}
                    <div className="space-y-6">
                        {/* User Preferences Card */}
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                                User Preferences
                            </h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                                Update your profile settings.
                            </p>

                            {/* Profile Info */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                                    Profile Info
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                            Location
                                        </label>
                                        <select className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Select location</option>
                                            <option>New York</option>
                                            <option>Los Angeles</option>
                                            <option>Chicago</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Incident Notifications */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                                    Incident Notifications
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { label: "Real-time Alerts", key: "realTime" },
                                        { label: "Daily Summaries", key: "dailySummaries" },
                                        { label: "Critical Updates", key: "criticalUpdates" },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between">
                                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                                {item.label}
                                            </span>
                                            <button
                                                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                                className={`w-10 h-5 rounded-full transition-colors ${notifications[item.key] ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-600'
                                                    }`}
                                            >
                                                <div
                                                    className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications[item.key] ? 'translate-x-5' : 'translate-x-0.5'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                                    Report Incident
                                </button>
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                                    Discard
                                </button>
                            </div>
                        </div>

                        {/* Emergency Actions */}
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                                Emergency Actions
                            </h2>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium">
                                Delete Incident
                            </button>
                        </div>
                    </div>

                    {/* Middle Column - Incident Management & Security */}
                    <div className="space-y-6">
                        {/* Incident Management */}
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                                Incident Management
                            </h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                                Streamline your incident reporting.
                            </p>
                        </div>

                        {/* Security Settings */}
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                                Security Settings
                            </h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                                Enable alerts for suspicious activity
                            </p>

                            <div className="space-y-3">
                                {[
                                    { label: "Enable alerts for suspicious activity", key: "suspiciousActivity" },
                                    { label: "Regularly update access permissions", key: "accessPermissions" },
                                    { label: "Log out inactive users", key: "inactiveUsers" },
                                    { label: "Implement two-factor verification", key: "twoFactor" },
                                    { label: "Audit incident logs periodically", key: "auditLogs" },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between">
                                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                            {item.label}
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={security[item.key]}
                                            onChange={() => setSecurity({ ...security, [item.key]: !security[item.key] })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Verification Level */}
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                                Verification Level
                            </h2>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">Basic</span>
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">Advanced</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={verificationLevel}
                                onChange={(e) => setVerificationLevel(e.target.value)}
                                className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Data Management */}
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                                Data Management
                            </h2>
                            <div className="space-y-3">
                                {[
                                    { label: "Backup incident data regularly", key: "backupData" },
                                    { label: "Export reports as needed", key: "exportReports" },
                                    { label: "Archive old incidents", key: "archiveOld" },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between">
                                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                            {item.label}
                                        </span>
                                        <button
                                            onClick={() => setDataManagement({ ...dataManagement, [item.key]: !dataManagement[item.key] })}
                                            className={`w-10 h-5 rounded-full transition-colors ${dataManagement[item.key] ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-600'
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 bg-white rounded-full transition-transform ${dataManagement[item.key] ? 'translate-x-5' : 'translate-x-0.5'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Subscription & Payment */}
                    <div className="space-y-6">
                        {/* Subscription */}
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                                Subscription
                            </h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                                Update your subscription details.
                            </p>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                                Payment Info
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                            Expiration MM / YY
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                            CVC
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Cancellation */}
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                                Cancellation
                            </h2>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
                                End Subscription
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
