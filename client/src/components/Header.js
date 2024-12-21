import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiSettings, FiUser, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';

function Header({ user, onLogout, isDarkMode, onToggleDarkMode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            Welcome Back, {user.name}
                        </h1>
                    </div>
                    
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-full hover:bg-gray-100 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <FiMenu size={24} />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 
                                        ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                                >
                                    <button
                                        onClick={() => {/* Implement profile view */}}
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
    );
}

export default Header; 