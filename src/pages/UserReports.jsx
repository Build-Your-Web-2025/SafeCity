import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { IconUpload, IconUser } from "@tabler/icons-react";

export default function UserReports() {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState(user?.email || "");
    const [profileImage, setProfileImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleApplyChanges = () => {
        // TODO: Implement profile update logic
        alert("Profile updated successfully!");
    };

    const handleDiscardChanges = () => {
        setDisplayName("");
        setEmail(user?.email || "");
        setProfileImage(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search incidents"
                            className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                            Report Incident
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                            Filter
                        </button>
                    </div>
                </div>

                {/* User Profile Card */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-blue-500 p-8">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
                        User Profile
                    </h1>

                    {/* Upload Profile Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Upload your profile
                        </h2>
                        <div className="flex items-center gap-6">
                            <div className="w-32 h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center overflow-hidden">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <IconUser className="w-16 h-16 text-neutral-400" />
                                )}
                            </div>
                            <div>
                                <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer inline-block">
                                    Change photo
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                                    Accepted formats: jpg, png. Max size: 500k.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Your Contact Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Your Contact
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Display name*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your display name"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Your Email Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Your email
                        </h2>
                        <div className="flex items-center gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                                Update email
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={handleDiscardChanges}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                        >
                            Discard changes
                        </button>
                        <button
                            onClick={handleApplyChanges}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                        >
                            Apply changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
