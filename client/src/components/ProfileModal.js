import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiCamera, FiUpload, FiTrash2 } from 'react-icons/fi';
import PasswordValidation from './PasswordValidation';

function ProfileModal({ isOpen, onClose, user, onUpdateProfile, isDarkMode }) {
    const [activeTab, setActiveTab] = useState('general');
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [customImage, setCustomImage] = useState(null);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const defaultIcons = [
        '👤', '👩', '👨', '🐱', '🐶', '🦊', '🐼', '🐨', '🦁', '🐯'
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCustomImage(reader.result);
                setSelectedIcon(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        // Implement password change logic
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Profile Settings
                                </h2>
                                <button
                                    onClick={onClose}
                                    className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="flex space-x-4 mb-6">
                                <button
                                    onClick={() => setActiveTab('general')}
                                    className={`px-4 py-2 rounded-md ${
                                        activeTab === 'general'
                                            ? 'bg-indigo-600 text-white'
                                            : isDarkMode
                                                ? 'text-gray-300 hover:bg-gray-700'
                                                : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    General
                                </button>
                                <button
                                    onClick={() => setActiveTab('avatar')}
                                    className={`px-4 py-2 rounded-md ${
                                        activeTab === 'avatar'
                                            ? 'bg-indigo-600 text-white'
                                            : isDarkMode
                                                ? 'text-gray-300 hover:bg-gray-700'
                                                : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Avatar
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`px-4 py-2 rounded-md ${
                                        activeTab === 'security'
                                            ? 'bg-indigo-600 text-white'
                                            : isDarkMode
                                                ? 'text-gray-300 hover:bg-gray-700'
                                                : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Security
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="mt-6 relative" style={{ minHeight: '400px' }}>
                                <AnimatePresence mode="wait">
                                    {activeTab === 'general' && (
                                        <motion.div
                                            key="general"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute w-full"
                                        >
                                            <div className="space-y-6">
                                                {/* Existing UserProfile form content */}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'avatar' && (
                                        <motion.div
                                            key="avatar"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute w-full"
                                        >
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-5 gap-4">
                                                    {defaultIcons.map((icon, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => {
                                                                setSelectedIcon(icon);
                                                                setCustomImage(null);
                                                            }}
                                                            className={`text-3xl p-4 rounded-lg ${
                                                                selectedIcon === icon
                                                                    ? 'bg-indigo-600'
                                                                    : isDarkMode
                                                                        ? 'bg-gray-700 hover:bg-gray-600'
                                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                            }`}
                                                        >
                                                            {icon}
                                                        </button>
                                                    ))}
                                                </div>
                                                
                                                <div className="mt-6">
                                                    <label className="block mb-2">
                                                        <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                                            Or upload your own
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                        />
                                                        <div className={`mt-2 px-4 py-2 rounded-md cursor-pointer text-center ${
                                                            isDarkMode
                                                                ? 'bg-gray-700 hover:bg-gray-600'
                                                                : 'bg-gray-100 hover:bg-gray-200'
                                                        }`}>
                                                            <FiUpload className="inline mr-2" />
                                                            Choose Image
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'security' && (
                                        <motion.div
                                            key="security"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute w-full"
                                        >
                                            <form onSubmit={handlePasswordChange} className="space-y-6">
                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                                        Current Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData({
                                                            ...passwordData,
                                                            currentPassword: e.target.value
                                                        })}
                                                        className={`w-full px-3 py-2 rounded-md ${
                                                            isDarkMode 
                                                                ? 'bg-gray-700 border-gray-600 text-white' 
                                                                : 'border border-gray-300'
                                                        }`}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                                        New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData({
                                                            ...passwordData,
                                                            newPassword: e.target.value
                                                        })}
                                                        className={`w-full px-3 py-2 rounded-md ${
                                                            isDarkMode 
                                                                ? 'bg-gray-700 border-gray-600 text-white' 
                                                                : 'border border-gray-300'
                                                        }`}
                                                        required
                                                    />
                                                    <PasswordValidation 
                                                        password={passwordData.newPassword}
                                                        isDarkMode={isDarkMode}
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                                                >
                                                    Update Password
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ProfileModal; 