import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiSettings, FiUser, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import ProfileModal from './ProfileModal';

function Header({ user, onLogout, isDarkMode, onToggleDarkMode, onUpdateProfile }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const handleProfileClick = () => {
        setIsMenuOpen(false);
        setIsProfileModalOpen(true);
    };

    return (
        <>
            <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${
                                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
                            }`}>
                                {user.avatar && (
                                    <img 
                                        src={user.avatar} 
                                        alt="Profile" 
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                )}
                            </div>
                            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                Welcome Back, {user.name}
                            </h1>
                        </div>
                        
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-2 rounded-full hover:bg-gray-100 ${
                                    isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <FiMenu size={24} />
                            </button>

                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`absolute right-0 top-12 w-48 rounded-md shadow-lg py-1 
                                            ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                                    >
                                        <button
                                            onClick={handleProfileClick}
                                            className={`flex items-center px-4 py-2 text-sm w-full ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            <FiUser className="mr-3" />
                                            Profile
                                        </button>
                                        
                                        <button
                                            onClick={onToggleDarkMode}
                                            className={`flex items-center px-4 py-2 text-sm w-full ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            {isDarkMode ? <FiSun className="mr-3" /> : <FiMoon className="mr-3" />}
                                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                                        </button>
                                        
                                        <button
                                            onClick={onLogout}
                                            className={`flex items-center px-4 py-2 text-sm w-full ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            <FiLogOut className="mr-3" />
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </nav>
            
            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                user={user}
                onUpdateProfile={onUpdateProfile}
                isDarkMode={isDarkMode}
            />
        </>
    );
}

export default Header; 