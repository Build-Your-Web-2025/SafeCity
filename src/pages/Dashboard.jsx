import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
    IconBell,
    IconClipboardText,
    IconFileText,
    IconFilter,
    IconChartBar,
    IconSettings,
    IconLogout,
    IconSearch,
    IconFlag,
    IconMessageCircle,
    IconUser,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import useAuth from "../hooks/useAuth";
import useIncidents from "../hooks/useIncidents"; // <--- Import the hook
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const links = [
        {
            label: "Incident Dashboard",
            href: "/dashboard",
            icon: (
                <IconClipboardText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Report Incidents",
            href: "/report",
            icon: (
                <IconFileText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "User Reports",
            href: "/user-reports",
            icon: (
                <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Filter Incidents",
            href: "/filter-incidents",
            icon: (
                <IconFilter className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Statistics",
            href: "/statistics",
            icon: (
                <IconChartBar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "App Settings",
            href: "/settings",
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];

    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "mx-auto flex w-full flex-1 flex-col overflow-hidden bg-gray-100 md:flex-row dark:bg-neutral-900",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: user?.email || "User",
                                href: "#",
                                icon: (
                                    <div className="h-7 w-7 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                        {user?.email?.[0]?.toUpperCase() || "U"}
                                    </div>
                                ),
                            }}
                        />
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 py-2 text-neutral-700 dark:text-neutral-200 hover:text-red-500"
                        >
                            <IconLogout className="h-5 w-5 shrink-0" />
                            {open && <span className="text-sm">Logout</span>}
                        </button>
                    </div>
                </SidebarBody>
            </Sidebar>
            <DashboardContent user={user} />
        </div>
    );
}

export const Logo = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <IconBell className="h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold whitespace-pre text-black dark:text-white text-lg"
            >
                SafeCity
            </motion.span>
        </a>
    );
};

export const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <IconBell className="h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" />
        </a>
    );
};

const DashboardContent = ({ user }) => {
    // 1. Fetch real-time data using the hook
    const { incidents, loading } = useIncidents();
    const navigate = useNavigate();

    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Helper to format timestamp
    const formatTime = (timestamp) => {
        if (!timestamp) return 'Just now';
        // Handle Firestore Timestamp or standard Date
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-1 overflow-auto">
            <div className="flex h-full w-full flex-1 flex-col gap-4 bg-white p-4 md:p-8 dark:bg-neutral-900">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <IconBell className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search incidents"
                                className="pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <IconSearch className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <IconBell className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                        <IconMessageCircle className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {user?.email?.[0]?.toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                {user?.displayName || "User"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Welcome Section */}
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        Welcome back, {user?.displayName?.split(' ')[0] || "User"}
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">View and report incidents easily.</p>
                </div>

                {/* Action Button & Cards */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <button 
                            onClick={() => navigate('/report')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                        >
                            Report Incident
                        </button>

                        {/* Meeting Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Active Reports</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Total: {incidents.length}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Updates Live</span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Latest Update</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {incidents.length > 0 ? incidents[0].category : "No reports"}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Just now</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Cards */}
                    <div className="flex gap-4">
                        <div className="bg-blue-500 p-6 rounded-lg text-white min-w-[140px] flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold mb-2">{incidents.length}</div>
                            <div className="text-sm">Total Incidents</div>
                        </div>
                        <div className="bg-blue-600 p-6 rounded-lg text-white min-w-[140px] flex flex-col items-center justify-center relative">
                            <div className="absolute top-2 right-2">
                                <IconFlag className="h-5 w-5" />
                            </div>
                            <div className="text-4xl font-bold mb-2">?</div>
                            <div className="text-sm mt-2">Help & Support</div>
                        </div>
                        <div className="bg-blue-700 p-6 rounded-lg text-white min-w-[140px] flex flex-col items-center justify-center relative">
                            <div className="absolute top-2 right-2">
                                <IconFlag className="h-5 w-5" />
                            </div>
                            <div className="text-4xl font-bold mb-2">?</div>
                            <div className="text-sm mt-2">FAQs</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Reports */}
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Quick Actions</h2>
                        
                        <div className="space-y-3">
                            {[
                                { title: "Report new incident", tag: "Action", action: () => navigate('/report') },
                                { title: "View Map", tag: "View", action: () => {} },
                            ].map((item, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={item.action}
                                    className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center">
                                            <IconClipboardText className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm text-neutral-900 dark:text-neutral-100">{item.title}</span>
                                    </div>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">{item.tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Incidents (LIVE DATA) */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                                Recent Incidents (Live)
                            </h2>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                {loading ? (
                                    <p className="text-sm text-neutral-500">Loading live data...</p>
                                ) : incidents.length === 0 ? (
                                    <p className="text-sm text-neutral-500">No incidents reported yet.</p>
                                ) : (
                                    // 2. Map over the LIVE incidents array
                                    incidents.map((incident) => (
                                        <div key={incident.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className={`
                                                    px-3 py-1 rounded text-xs font-semibold text-white
                                                    ${incident.category === 'Crime' ? 'bg-red-600' : 
                                                      incident.category === 'Fire' ? 'bg-orange-500' : 
                                                      'bg-blue-600'}
                                                `}>
                                                    {incident.category || 'Report'}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                        {incident.title}
                                                    </div>
                                                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                                                        {incident.description ? incident.description.substring(0, 30) + '...' : 'No details'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-neutral-600 dark:text-neutral-400 block">
                                                    {formatTime(incident.timestamp)}
                                                </span>
                                                {incident.verified && (
                                                    <span className="text-[10px] text-green-600 font-bold">Verified</span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Incident Statistics */}
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Live Statistics</h2>
                    <div className="flex items-end justify-between h-40">
                        {/* Simple visualization based on live count (placeholder bars for now) */}
                        {["Low", "Medium", "High", "Critical", "Verif.", "Unve.", "All"].map((label, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                                <div
                                    className="w-12 bg-blue-500 rounded-t transition-all duration-500"
                                    style={{ height: `${Math.random() * 80 + 20}%` }}
                                />
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};