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
            <DashboardContent />
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

const DashboardContent = () => {
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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
                                JD
                            </div>
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">John Doe</span>
                        </div>
                    </div>
                </div>

                {/* Welcome Section */}
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Welcome back, User</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">View and report incidents easily.</p>
                </div>

                {/* Action Button & Cards */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                            Report Incident
                        </button>

                        {/* Meeting Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Next review meeting</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Week 3</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white dark:border-neutral-800" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Incident Team</span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Next updates</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Week 3</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-6 w-6 rounded-full bg-green-500 border-2 border-white dark:border-neutral-800" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Incident Team</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Cards */}
                    <div className="flex gap-4">
                        <div className="bg-blue-500 p-6 rounded-lg text-white min-w-[140px] flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold mb-2">75</div>
                            <div className="text-sm">Current incident status</div>
                        </div>
                        <div className="bg-blue-600 p-6 rounded-lg text-white min-w-[140px] flex flex-col items-center justify-center relative">
                            <div className="absolute top-2 right-2">
                                <IconFlag className="h-5 w-5" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-xs">?</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm mt-2">Help & Support</div>
                        </div>
                        <div className="bg-blue-700 p-6 rounded-lg text-white min-w-[140px] flex flex-col items-center justify-center relative">
                            <div className="absolute top-2 right-2">
                                <IconFlag className="h-5 w-5" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-xs">?</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm mt-2">FAQs</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Reports */}
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">My Reports</h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">3 active incidents</p>

                        <div className="space-y-3">
                            {[
                                { title: "Report new incident", tag: "Incidents" },
                                { title: "Manage your incidents", tag: "New" },
                                { title: "Filter by severity and status", tag: "Incidents" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                                        <span className="text-sm text-neutral-900 dark:text-neutral-100">{item.title}</span>
                                    </div>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">{item.tag}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                            Report Incident
                        </button>
                    </div>

                    {/* Calendar & Recent Incidents */}
                    <div className="space-y-6">
                        {/* Calendar Stats */}
                        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{currentMonth}</h2>
                            <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                {["Low", "Medium", "High", "Critical", "Verified", "Unverif.", "All"].map((label, idx) => (
                                    <div key={idx}>
                                        <div className="text-neutral-600 dark:text-neutral-400">{label}</div>
                                        <div className="font-bold text-neutral-900 dark:text-neutral-100">{idx + 2}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Incidents */}
                        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Recent Incidents</h2>
                            <div className="space-y-3">
                                {[
                                    { title: "Traffic Accident", location: "Main St, 2 hours ago", time: "14:00" },
                                    { title: "Fire Alarm", location: "Elm St, 1 hour ago", time: "15:00" },
                                    { title: "Total Incidents", subtitle: "5 reported today", time: "Last hour: 2" },
                                    { title: "User Feedback", subtitle: "2 responses, 1 urgent", time: "16:00" },
                                    { title: "User Feedback", subtitle: "1 response, 0 urgent", time: "16:30" }
                                ].map((incident, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">View</div>
                                            <div>
                                                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{incident.title}</div>
                                                <div className="text-xs text-neutral-600 dark:text-neutral-400">{incident.location || incident.subtitle}</div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-neutral-600 dark:text-neutral-400">{incident.time}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                                See all incidents
                            </button>
                        </div>
                    </div>
                </div>

                {/* Incident Statistics */}
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Incident Statistics</h2>
                    <div className="flex items-end justify-between h-40">
                        {["Low", "Medium", "High", "Critical", "Verif.", "Unve.", "All"].map((label, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                                <div
                                    className="w-12 bg-blue-500 rounded-t"
                                    style={{ height: `${Math.random() * 100 + 20}%` }}
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
