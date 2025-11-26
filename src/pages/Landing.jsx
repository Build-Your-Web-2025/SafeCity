import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    IconMapPin,
    IconClock,
    IconFilter,
    IconShieldCheck,
    IconUserCheck,
    IconBell,
    IconArrowRight,
    IconCheck,
} from '@tabler/icons-react';
import AnimatedCounter from '../components/AnimatedCounter';
import heroBackground from '/home/shaggy/.gemini/antigravity/brain/0897cda3-d35d-4458-928e-e1370267fed6/hero_background_city_1764140744325.png';

const Landing = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: IconClock,
            title: 'Real-Time Reporting',
            description: 'Submit incidents instantly with photos, location, and details',
            color: 'text-sky-500',
        },
        {
            icon: IconMapPin,
            title: 'Interactive Map Dashboard',
            description: 'View all incidents on a live map with location markers',
            color: 'text-emerald-500',
        },
        {
            icon: IconFilter,
            title: 'Smart Categorization',
            description: 'Filter by incident types: Road Issues, Fire, Crime, Accidents, etc.',
            color: 'text-blue-500',
        },
        {
            icon: IconShieldCheck,
            title: 'Community Verified',
            description: 'Admin moderation to ensure report authenticity',
            color: 'text-green-500',
        },
        {
            icon: IconUserCheck,
            title: 'User Authentication',
            description: 'Secure login/register system for trusted reporting',
            color: 'text-cyan-500',
        },
        {
            icon: IconBell,
            title: 'Location-Based Alerts',
            description: 'Track incidents in your neighborhood and stay informed',
            color: 'text-orange-500',
        },
    ];

    const steps = [
        {
            number: '01',
            title: 'Sign Up & Verify',
            description: 'Create your account and verify your identity to join the community',
            icon: IconUserCheck,
        },
        {
            number: '02',
            title: 'Report Incidents',
            description: 'Submit incidents with location, photos, and detailed descriptions',
            icon: IconMapPin,
        },
        {
            number: '03',
            title: 'Track & Help',
            description: 'Monitor reports and contribute to making your community safer',
            icon: IconShieldCheck,
        },
    ];

    const stats = [
        { label: 'Reports Submitted', value: 12547, suffix: '+' },
        { label: 'Active Users', value: 3842, suffix: '+' },
        { label: 'Issues Resolved', value: 8934, suffix: '+' },
        { label: 'Cities Covered', value: 47, suffix: '' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: `url(${heroBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90"></div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            SafeCity - Report. Track.{' '}
                            <span className="text-gradient block mt-2">Make Your City Safer.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
                    >
                        A crowdsourced platform for real-time incident reporting. Empower your community to
                        identify, track, and resolve safety issues together.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button
                            onClick={() => navigate('/register')}
                            className="btn-primary px-8 py-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl flex items-center gap-2"
                        >
                            Get Started
                            <IconArrowRight size={20} />
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn-secondary px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-semibold rounded-full border-2 border-white/30 hover:bg-white/20"
                        >
                            View Dashboard
                        </button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="animate-bounce">
                        <svg
                            className="w-6 h-6 text-white/60"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                            Powerful Features for Safer Communities
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to report, track, and resolve safety incidents in your area
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="glass-dark p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon size={48} stroke={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get started in three simple steps
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connection Lines */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-blue-500 transform -translate-y-1/2 z-0"></div>

                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative z-10"
                            >
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-sky-500">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                            {step.number}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex justify-center mb-4 text-sky-500">
                                            <step.icon size={40} stroke={1.5} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Making an Impact Together
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Join thousands of citizens making their communities safer
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-300"
                            >
                                <div className="text-5xl sm:text-6xl font-bold text-gradient mb-2">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-gray-300 text-lg font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-sky-500 to-emerald-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Ready to Make Your City Safer?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join our community of active citizens and start reporting incidents today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => navigate('/register')}
                                className="px-10 py-5 bg-white text-sky-600 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                            >
                                Sign Up Now
                                <IconArrowRight size={20} />
                            </button>
                            <Link
                                to="/login"
                                className="text-white text-lg font-semibold hover:underline flex items-center gap-2"
                            >
                                Already have an account? Log in
                                <IconArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-400">
                        <p className="text-lg mb-2">
                            <span className="text-gradient font-bold text-xl">SafeCity</span>
                        </p>
                        <p>© 2025 SafeCity. Making communities safer, together.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
