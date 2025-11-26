import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
    IconBell,
    IconClipboardText,
    IconFileText,
    IconFilter,
    IconSettings,
    IconLogout,
    IconSearch,
    IconMessageCircle,
    IconUser,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import useAuth from "../hooks/useAuth";
import useIncidents from "../hooks/useIncidents"; 
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
        // Statistics link removed here
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
    
    // 2. Add Search State
    const [searchTerm, setSearchTerm] = useState("");

    // Helper to format timestamp
    const formatTime = (timestamp) => {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // 3. Filter Logic based on search term
    const filteredIncidents = incidents.filter((incident) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        const titleMatch = incident.title?.toLowerCase().includes(term);
        const descMatch = incident.description?.toLowerCase().includes(term);
        const categoryMatch = incident.category?.toLowerCase().includes(term);
        return titleMatch || descMatch || categoryMatch;
    });

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
                                placeholder="Search incidents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
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

                {/* Action Button & Info Cards */}
                <div className="flex flex-col md:flex-row gap-4">
                    
                    {/* Report Button */}
                    <div className="flex-none">
                        <button 
                            onClick={() => navigate('/report')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl font-bold shadow-lg shadow-blue-500/30 h-full flex items-center justify-center text-lg"
                        >
                            Report Incident
                        </button>
                    </div>

                    {/* Stats Cards - CLEANED UP (No Help/FAQs) */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* Active Reports Card */}
                        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Active Reports</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Total: {incidents.length}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-green-500 dark:text-green-400">Updates Live</span>
                            </div>
                        </div>

                        {/* Latest Update Card */}
                        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Latest Update</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                                {incidents.length > 0 ? incidents[0].title : "No reports"}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">Just now</span>
                            </div>
                        </div>

                        {/* Total Incidents (Clean Number) */}
                        <div className="bg-blue-600 p-4 rounded-lg text-white flex flex-col items-center justify-center shadow-lg">
                            <div className="text-4xl font-bold mb-1">{incidents.length}</div>
                            <div className="text-xs font-medium opacity-90">Total Incidents</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
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
                                    className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-500"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-600 flex items-center justify-center">
                                            <IconClipboardText className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                                        </div>
                                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.title}</span>
                                    </div>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase font-semibold tracking-wider">{item.tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Incidents (LIVE DATA) */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                                    Recent Incidents (Live)
                                </h2>
                                {searchTerm && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                        Filtering: "{searchTerm}"
                                    </span>
                                )}
                            </div>
                            <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                                {loading ? (
                                    <p className="text-sm text-neutral-500 text-center py-8">Loading live data...</p>
                                ) : filteredIncidents.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-sm text-neutral-500">No incidents found.</p>
                                        {searchTerm && (
                                            <button onClick={() => setSearchTerm("")} className="text-blue-500 text-xs mt-1 hover:underline">
                                                Clear search
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    filteredIncidents.map((incident) => (
                                        <div key={incident.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg border border-transparent hover:border-neutral-200 dark:hover:border-neutral-600 transition-all">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className={`
                                                    shrink-0 px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wide
                                                    ${incident.category === 'Crime' ? 'bg-red-600' : 
                                                      incident.category === 'Fire' ? 'bg-orange-500' : 
                                                      incident.category === 'Medical' ? 'bg-rose-500' :
                                                      'bg-blue-600'}
                                                `}>
                                                    {incident.category || 'Report'}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                                        {incident.title}
                                                    </div>
                                                    <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[150px]">
                                                        {incident.description || 'No details provided'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-mono">
                                                    {formatTime(incident.timestamp)}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Statistics Section */}
                <div className="mt-6 bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Live Statistics</h2>
                    <div className="h-32 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg flex items-center justify-center text-neutral-400 text-sm">
                        [Live Incident Trend Chart Placeholder]
                    </div>
                </div>
            </div>
        </div>
    );
};